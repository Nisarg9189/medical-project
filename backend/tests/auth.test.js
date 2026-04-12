const request = require("supertest");
const mongoose = require("mongoose");
// const app = require("../index.js");

const Admin = require("../models/admin.js");
const Doctor = require("../models/doctor.js");
const Patient = require("../models/patient.js");

const { MongoMemoryServer } = require("mongodb-memory-server");

const bcrypt = require("bcrypt");


async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds); // generate salt
}

async function verifyPassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
}

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterEach(async () => {
    await Admin.deleteMany({});
    await Doctor.deleteMany({});
    await Patient.deleteMany({});
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe("POST /auth/login", () => {

    // ✅ 1. Successful Admin Login
    it("should login admin successfully", async () => {
        const hashed = await hashPassword("correctPassword");

        await Admin.create({
            name: "Admin",
            email: "admin@test.com",
            password: hashed,
        });

        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "admin@test.com",
                password: "correctPassword",
                role: "admin",
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
    });

    // ❌ 2. Wrong Password
    it("should fail with wrong password", async () => {
        const hashed = await hashPassword("correctPassword");

        await Admin.create({
            name: "Admin",
            email: "admin@test.com",
            password: hashed,
        });

        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "admin@test.com",
                password: "wrongPassword",
                role: "admin",
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.ok).toBe(false);
    });

    // ❌ 3. User Not Found
    it("should fail if user does not exist", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "nouser@test.com",
                password: "123456",
                role: "doctor",
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.ok).toBe(false);
    });

    // ❌ 4. Invalid Role
    it("should fail for invalid role", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "admin@test.com",
                password: "correctPassword",
                role: "manager",
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.ok).toBe(false);
    });

    // ⚠️ 5. Missing Fields
    it("should fail when fields are missing", async () => {
        const res = await request(app)
            .post("/auth/login")
            .send({
                email: "",
                password: "",
                role: "admin",
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.ok).toBe(false);
    });

});