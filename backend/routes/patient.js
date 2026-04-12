const express = require("express");
const router = express.Router({ mergeParams: true });
const Admin = require("../models/admin");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Appoinment = require("../models/appoinment");
const Camp = require("../models/camp");
const { isLoggedIn } = require("../utils/middleware");
const pdfDocument = require("pdfkit");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
client.authentications['api-key'].apiKey = "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";
const tranEmailApi = new Sib.TransactionalEmailsApi();

router.get("/:patientId/appointments", isLoggedIn, wrapAsync(async (req, res) => {
  let { patientId } = req.params;
  let appointments = await Appoinment.find({ patientId, isDone: false })
    .populate("doctorId")
    .populate("campId");
  res.json(appointments);
}));

router.post("/camps/:campId/patient/:patientId", isLoggedIn, wrapAsync(async (req, res) => {
  let { campId, patientId } = req.params;
  let checkExisting = await Appoinment.findOne({ campId, patientId });
  // console.log(checkExisting);
  if (checkExisting) {
    return res.json({ ok: false });
  }

  const patient = await Patient.findById(patientId);
  const email = patient.email;

  let camp = await Camp.findById(campId).populate("AssignDoctor");
  // console.log(camp);
  let appoinment = new Appoinment({
    campId: campId,
    doctorId: camp.AssignDoctor._id,
    patientId: patientId,
  });
  await appoinment.save();

  try {
    const sender = { email: 'nisargpatel460@gmail.com', name: 'ExpenseHub' };
    const receivers = [{ email }];

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Your Appoinment',
      htmlContent: `
    <p>Dear <b>${patient.name}</b>,</p>

    <p>
      Your <b>Appoinment on ${camp.Date}</b> has been
      <b>successfully submitted.</b>.
    </p>

    <p>
      Regards,<br>
      <b>Rural Hospital</b>
    </p>
  `,
    });
  } catch (err) {
    console.log(err.message);
  }

  res.json({ message: "Registred Successfully", ok: true });
}));

router.post("/book-appontment", isLoggedIn, wrapAsync(async (req, res) => {
  console.log(req.body);
  const { patientId, age, camp, appointmentDate, appointmentTime, gender, doctor } = req.body;

  const patient = await Patient.findById(patientId);
  const email = patient.email;

  let assignedDoctorId;
  if(camp) {
    let campDoc = await Camp.findById(camp).select("AssignDoctor");
    assignedDoctorId = campDoc.AssignDoctor;
  } else if (doctor) {
    assignedDoctorId = doctor;
  } else {
    return res.status(400).json({ message: "Must provide either camp or doctor.", ok: false });
  }

  let appointment = new Appoinment({
    patientId: patientId,
    doctorId: assignedDoctorId,
    campId: camp || null,
    date: appointmentDate,
    time: appointmentTime,
    Gender: gender,
    Age: age
  });
  await appointment.save();

  try {
    const sender = { email: 'nisargpatel460@gmail.com', name: 'ExpenseHub' };
    const receivers = [{ email }];

    const response = await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: 'Your Appoinment',
      htmlContent: `
    <p>Dear <b>${patient.name}</b>,</p>

    <p>
      Your <b>Appoinment on ${appointmentDate}</b> has been
      <b>successfully submitted.</b>.
    </p>

    <p>
      Regards,<br>
      <b>Rural Hospital</b>
    </p>
  `,
    });


  } catch (err) {
    console.log(err.message);
  }

  res.json({ message: "Appointment booked successfully!", ok: true });
}));

router.get("/:patientId/report/:campId", isLoggedIn, wrapAsync(async (req, res) => {
  let { patientId, campId } = req.params;
  console.log(patientId, campId);
  let appointment = await Appoinment.findOne({ patientId, _id: campId, isDone: true })
    .populate("doctorId")
    .populate("campId");

  console.log(appointment);

  if (!appointment) {
    return res.status(404).json({ message: "No completed appointment found for the selected camp." });
  }

  const doc = new pdfDocument();
  let filename = `Report_${patientId}_${campId}.pdf`;
  filename = encodeURIComponent(filename);

  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-Type', 'application/pdf');

  doc.pipe(res);

  doc.fontSize(20).text(`Report`, { align: 'center', underline: true });
  doc.moveDown();

  doc.fontSize(12).text(`Patient ID: ${patientId}`);
  if (appointment.campId) {
      doc.text(`Camp: ${appointment.campId.CampType} at ${appointment.campId.villageName}`);
      doc.text(`Date: ${new Date(appointment.campId.Date).toLocaleDateString()}`);
  } else {
      doc.text(`Visit Type: Direct Consultation`);
      doc.text(`Date: ${appointment.date ? new Date(appointment.date).toLocaleDateString() : 'N/A'}`);
  }
  if (appointment.doctorId) {
      doc.text(`Doctor: ${appointment.doctorId.name} (${appointment.doctorId.specialization})`);
  }
  doc.moveDown();

  doc.text(`Symptoms: ${appointment.symptoms}`);
  doc.moveDown();

  doc.text(`Diagnosis: ${appointment.diagnosis}`);
  doc.moveDown();

  doc.text(`Prescription: ${appointment.prescription}`);

  doc.end();
}));

router.get("/camps/:patientId", isLoggedIn, wrapAsync(async (req, res) => {
  let { patientId } = req.params;

  let patientsCamps = await Appoinment.find({ patientId, isDone: true }).populate("campId");
  console.log(patientsCamps);
  res.json(patientsCamps);
}));

module.exports = router;