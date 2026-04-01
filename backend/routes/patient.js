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
client.authentications['api-key'].apiKey = process.env.EMAIL_API_KEY;
const tranEmailApi = new Sib.TransactionalEmailsApi();

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
  const { patientId, age, camp, appointmentDate, appointmentTime, gender } = req.body;

  const patient = await Patient.findById(patientId);
  const email = patient.email;

  let doctorId = await Camp.findById(camp).select("AssignDoctor");
  let appointment = new Appoinment({
    patientId: patientId,
    doctorId: doctorId.AssignDoctor,
    campId: camp,
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

  doc.fontSize(20).text(`Camp Report`, { align: 'center', underline: true });
  doc.moveDown();

  doc.fontSize(12).text(`Patient ID: ${patientId}`);
  doc.text(`Camp: ${appointment.campId.CampType} at ${appointment.campId.villageName}`);
  doc.text(`Date: ${new Date(appointment.campId.Date).toLocaleDateString()}`);
  doc.text(`Doctor: ${appointment.doctorId.name} (${appointment.doctorId.specialization})`);
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