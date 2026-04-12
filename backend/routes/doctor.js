
const express = require("express");
const router = express.Router({ mergeParams: true });
const Doctor = require("../models/doctor");
const Appoinment = require("../models/appoinment");
const { isLoggedIn } = require("../utils/middleware");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");
const ExcelJS = require("exceljs");


router.get("/:doctorId/patients", isLoggedIn, wrapAsync(async (req, res) => {
  let { doctorId } = req.params;
  let appointments = await Appoinment.find({ doctorId: doctorId, isDone: false }).populate("patientId").populate("campId");
  res.json(appointments);
}));

router.get("/:doctorId/patients/paginated", isLoggedIn, wrapAsync(async (req, res) => {
  let { doctorId } = req.params;
  let page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 4;
  let skip = (page - 1) * limit;

  let filter = { doctorId, isDone: false };
  if (req.query.date && req.query.date.trim() !== "") {
    let dayStart = new Date(`${req.query.date}T00:00:00.000Z`);
    let dayEnd = new Date(`${req.query.date}T23:59:59.999Z`);
    filter.date = { $gte: dayStart, $lte: dayEnd };
  }

  let totalCount = await Appoinment.countDocuments(filter);
  let appointments = await Appoinment.find(filter)
    .populate("patientId")
    .populate("campId")
    .sort({ date: 1 })
    .skip(skip)
    .limit(limit);

  res.json({
    appointments,
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalCount
  });
}));

router.get("/:doctorId/appointments", isLoggedIn, wrapAsync(async (req, res) => {
  let { doctorId } = req.params;

  let pendingAppointmentCount = await Appoinment.countDocuments({ doctorId, isDone: false });
  let completedAppointmentCount = await Appoinment.countDocuments({ doctorId, isDone: true });
  let totalPatients = await Appoinment.countDocuments({ doctorId });

  res.json({
    pending: pendingAppointmentCount,
    completed: completedAppointmentCount,
    totalPatients: totalPatients, ok: true
  });
}));

router.get("/:doctorId/details", isLoggedIn, wrapAsync(async (req, res) => {
  let { doctorId } = req.params;
  let doctor = await Doctor.findById(doctorId);
  res.json(doctor);
}));

router.put("/:doctorId/update-profile", isLoggedIn, wrapAsync(async (req, res) => {
  let { doctorId } = req.params;
  let { specialization, location, phone, appointmentFee } = req.body;
  let updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, {
    specialization,
    location,
    phone,
    appointmentFee
  }, { new: true });
  res.json({ message: "Profile updated successfully!", doctor: updatedDoctor, ok: true });
}));

// ─── Download Completed Appointments as Excel ───────────────────────────────
router.get("/:doctorId/appointments/download", isLoggedIn, wrapAsync(async (req, res) => {
  let { doctorId } = req.params;
  let { startDate, endDate } = req.query;          // ← NEW

  // Build date filter only when params are provided
  let dateFilter = {};
  if (startDate || endDate) {
    dateFilter.date = {};
    if (startDate) dateFilter.date.$gte = new Date(`${startDate}T00:00:00.000Z`);
    if (endDate)   dateFilter.date.$lte = new Date(`${endDate}T23:59:59.999Z`);
  }

  let completedAppointments = await Appoinment.find({ doctorId, isDone: true, ...dateFilter }) // ← changed
    .populate("patientId")
    .populate("doctorId")
    .populate("campId");

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Rural Hospital System";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Completed Appointments", {
    pageSetup: { fitToPage: true, orientation: "landscape" }
  });

  // ── Column definitions (maps to every field in appointmentSchema) ──────────
  sheet.columns = [
    { header: "Appointment ID", key: "appointmentId", width: 28 },
    { header: "Patient Name", key: "patientName", width: 22 },
    { header: "Patient ID", key: "patientId", width: 28 },
    { header: "Doctor Name", key: "doctorName", width: 22 },
    { header: "Doctor ID", key: "doctorId", width: 28 },
    { header: "Camp Name", key: "campName", width: 22 },
    { header: "Camp ID", key: "campId", width: 28 },
    { header: "Date", key: "date", width: 18 },
    { header: "Time", key: "time", width: 12 },
    { header: "Gender", key: "Gender", width: 10 },
    { header: "Age", key: "Age", width: 8 },
    { header: "Symptoms", key: "symptoms", width: 35 },
    { header: "Diagnosis", key: "diagnosis", width: 35 },
    { header: "Prescription", key: "prescription", width: 35 },
    { header: "Status", key: "isDone", width: 14 },
  ];

  // ── Header row styling ─────────────────────────────────────────────────────
  const headerRow = sheet.getRow(1);
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF065F46" },   // emerald-900
    };
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" },
      size: 11,
      name: "Calibri",
    };
    cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    cell.border = {
      top: { style: "thin", color: { argb: "FF047857" } },
      bottom: { style: "thin", color: { argb: "FF047857" } },
      left: { style: "thin", color: { argb: "FF047857" } },
      right: { style: "thin", color: { argb: "FF047857" } },
    };
  });
  headerRow.height = 28;

  // ── Data rows ──────────────────────────────────────────────────────────────
  completedAppointments.forEach((appt, idx) => {
    const row = sheet.addRow({
      appointmentId: appt._id?.toString() ?? "",
      patientName: appt.patientId?.name ?? "N/A",
      patientId: appt.patientId?._id?.toString() ?? "",
      doctorName: appt.doctorId?.name ?? "N/A",
      doctorId: appt.doctorId?._id?.toString() ?? "",
      campName: appt.campId?.name ?? "N/A",
      campId: appt.campId?._id?.toString() ?? "",
      date: appt.date ? new Date(appt.date).toLocaleDateString("en-IN") : "",
      time: appt.time ?? "",
      Gender: appt.Gender ?? "",
      Age: appt.Age ?? "",
      symptoms: appt.symptoms ?? "",
      diagnosis: appt.diagnosis ?? "",
      prescription: appt.prescription ?? "",
      isDone: appt.isDone ? "Completed" : "Pending",
    });

    // Alternate row fill for readability
    const fillColor = idx % 2 === 0 ? "FFF0FDF4" : "FFFFFFFF"; // mint / white
    row.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: fillColor },
      };
      cell.font = { size: 10, name: "Calibri" };
      cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
      cell.border = {
        top: { style: "hair", color: { argb: "FFD1FAE5" } },
        bottom: { style: "hair", color: { argb: "FFD1FAE5" } },
        left: { style: "hair", color: { argb: "FFD1FAE5" } },
        right: { style: "hair", color: { argb: "FFD1FAE5" } },
      };
    });
    row.height = 20;
  });

  // ── Freeze header row ──────────────────────────────────────────────────────
  sheet.views = [{ state: "frozen", ySplit: 1 }];

  // ── Stream the workbook back to the client ─────────────────────────────────
  const doctorDoc = await Doctor.findById(doctorId);
  const safeName = (doctorDoc?.name ?? "doctor").replace(/\s+/g, "_");
  const fileName = `Completed_Appointments_Dr_${safeName}_${Date.now()}.xlsx`;

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  await workbook.xlsx.write(res);
  res.end();
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

  res.json({
    message: "Diagnosis added successfully!", updatedAppointment: updateAppointment, ok: true
  });
}));

module.exports = router;