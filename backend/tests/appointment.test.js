const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

jest.setTimeout(300000); // Super long timeout (5 minutes) for Mongo Server download

jest.mock("../utils/middleware", () => ({
  isLoggedIn: (req, res, next) => next()
}));

jest.mock("sib-api-v3-sdk", () => {
  return {
    ApiClient: {
      instance: {
        authentications: {
          "api-key": { apiKey: "" },
        },
      },
    },
    TransactionalEmailsApi: jest.fn().mockImplementation(() => {
      return {
        sendTransacEmail: jest.fn().mockResolvedValue({}),
      };
    }),
  };
});

const patientRoutes = require("../routes/patient.js");
const Patient = require("../models/patient.js");
const Doctor = require("../models/doctor.js");
const Camp = require("../models/camp.js");
const Appoinment = require("../models/appoinment.js");
const Admin = require("../models/admin.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/patient", patientRoutes);

let mongoServer;
let doc, pat, camp, admin;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  admin = await Admin.create({
    name: "admin",
    email: "admin@test.com",
    password: "hashed"
  });

  doc = await Doctor.create({
    name: "Dr. Smith",
    email: "doc@test.com",
    password: "hashed",
    adminId: admin._id
  });

  pat = await Patient.create({
    name: "John Doe",
    email: "john@test.com",
    password: "hashed"
  });

  camp = await Camp.create({
    villageName: "Test Village",
    AssignDoctor: doc._id,
    CampType: "Eye Camp",
    Time: "10:00 AM",
    adminId: admin._id
  });
});

afterEach(async () => {
  await Patient.deleteMany({});
  await Doctor.deleteMany({});
  await Camp.deleteMany({});
  await Appoinment.deleteMany({});
  await Admin.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

describe("Appointment Booking Module (/patient)", () => {

  describe("POST /patient/camps/:campId/patient/:patientId", () => {
    it("should successfully book a camp appointment", async () => {
      const res = await request(app).post(`/patient/camps/${camp._id}/patient/${pat._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.message).toBe("Registred Successfully");

      const apt = await Appoinment.findOne({ campId: camp._id, patientId: pat._id });
      expect(apt).toBeTruthy();
      expect(apt.doctorId.toString()).toBe(doc._id.toString());
    });

    it("should return ok: false if appointment already exists", async () => {
      // First booking
      await request(app).post(`/patient/camps/${camp._id}/patient/${pat._id}`);
      // Second booking
      const res = await request(app).post(`/patient/camps/${camp._id}/patient/${pat._id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(false);
    });
  });

  describe("POST /patient/book-appontment", () => {
    it("should book appointment using doctor directly", async () => {
      const payload = {
        patientId: pat._id,
        doctor: doc._id,
        age: 30,
        gender: "Male",
        appointmentDate: "2026-04-15",
        appointmentTime: "10:00 AM"
      };

      const res = await request(app)
        .post("/patient/book-appontment")
        .send(payload);

      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);
      expect(res.body.message).toBe("Appointment booked successfully!");

      const apt = await Appoinment.findOne({ patientId: pat._id, doctorId: doc._id });
      expect(apt).toBeTruthy();
      expect(apt.Age).toBe(30);
      expect(apt.Gender).toBe("Male");
    });

    it("should book appointment using camp ID", async () => {
      const payload = {
        patientId: pat._id,
        camp: camp._id,
        age: 26,
        gender: "Female",
        appointmentDate: "2026-04-16",
        appointmentTime: "11:00 AM"
      };

      const res = await request(app)
        .post("/patient/book-appontment")
        .send(payload);

      expect(res.statusCode).toBe(200);
      expect(res.body.ok).toBe(true);

      const apt = await Appoinment.findOne({ patientId: pat._id, campId: camp._id });
      expect(apt).toBeTruthy();
      expect(apt.doctorId.toString()).toBe(doc._id.toString());
    });

    it("should fail if neither camp nor doctor is provided", async () => {
      const payload = {
        patientId: pat._id,
        age: 26,
        gender: "Female",
        appointmentDate: "2026-04-16",
        appointmentTime: "11:00 AM"
      };

      const res = await request(app)
        .post("/patient/book-appontment")
        .send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body.ok).toBe(false);
    });
  });
});
