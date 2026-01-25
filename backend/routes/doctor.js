const express = require("express");
const router = express.Router({mergeParams: true});
const Doctor = require("../models/doctor");
const Appoinment = require("../models/appoinment");
const {isLoggedIn} = require("../utils/middleware");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");


router.get("/:doctorId/patients", isLoggedIn,  wrapAsync(async (req, res) => {
  let { doctorId } = req.params;
  let appointments = await Appoinment.find({ doctorId: doctorId, isDone: false }).populate("patientId").populate("campId");
  // console.log(appointments);
  res.json(appointments);
}));

router.get("/:doctorId/appointments", isLoggedIn,  wrapAsync(async (req, res) => {
  let { doctorId } = req.params;

  let pendingAppointmentCount = await Appoinment.countDocuments({ doctorId, isDone: false });
  let completedAppointmentCount = await Appoinment.countDocuments({ doctorId, isDone: true });
  let totalPatients = await Appoinment.countDocuments({ doctorId });

  res.json({
    pending: pendingAppointmentCount,
    completed: completedAppointmentCount,
    totalPatients: totalPatients, ok:true});
}));

router.get("/:doctorId/details", isLoggedIn, wrapAsync(async (req, res) => {
  let { doctorId } = req.params;
  let doctor = await Doctor.findById(doctorId);
  res.json(doctor);
}));

router.post("/addDiagnosis/:appointmentId", isLoggedIn, wrapAsync(async (req, res) => {
  let { appointmentId } = req.params;
  console.log("Updating Appointment:", appointmentId);
  let updateAppointment = await Appoinment.findByIdAndUpdate(appointmentId, {
    symptoms: req.body.symptoms,
    diagnosis: req.body.diagnosis,
    prescription: req.body.prescription,
    isDone: true
  }, { new: true });

  res.json({ message: "Diagnosis added successfully!", updatedAppointment: updateAppointment, ok: true
   });
}));

module.exports = router;