const express = require("express");
const router = express.Router({mergeParams: true});
const Doctor = require("../models/doctor");
const Camp = require("../models/camp");
const bcrypt = require("bcrypt");
const {isLoggedIn} = require("../utils/middleware");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/expressError");

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds); // generate salt
}

router.post("/:adminId/create/camp", isLoggedIn, wrapAsync(async (req, res) => {
  let { adminId } = req.params;
  console.log(req.body);
  const { villageName, Date, Time, doctorId } = req.body;
  let campType = await Doctor.find({ _id: doctorId }).select("specialization").lean();
  console.log(campType)
  let newCamp = new Camp({
    villageName: villageName,
    Date: Date,
    Time: Time,
    CampType: campType[0].specialization,
    AssignDoctor: doctorId,
    adminId: adminId
  });

  let camp = await newCamp.save();
  // console.log(camp);
  res.json({ message: "Camp created!", received: camp });

}));

router.get("/:adminId/camps", isLoggedIn,  wrapAsync(async (req, res) => {
  let { adminId } = req.params;
  let camps = await Camp.find({ adminId }).populate("AssignDoctor");
  res.json(camps);
}));

router.post("/:adminId/create/doctor", isLoggedIn, wrapAsync(async (req, res) => {
  let { adminId } = req.params;
  console.log(req.body);
  const { name, email, password, specialization } = req.body;
  const hashPass = await hashPassword(password);

  let newDoctor = new Doctor({
    name: name,
    email: email,
    adminId: adminId,
    password: hashPass,
    specialization: specialization
  });

  await newDoctor.save();

  res.json({ message: "Doctor created!", received: req.body, ok: true });

  // console.log(adminId);
}));

router.get("/:adminId/doctors", wrapAsync(async (req, res) => {
  let { adminId } = req.params;
  let doctors = await Doctor.find({ adminId: adminId });
  console.log(doctors);
  res.json(doctors);
}));

router.get("/:adminId/card-details", isLoggedIn, wrapAsync(async (req, res) => {
  let { adminId } = req.params;

  let totalCamps = await Camp.countDocuments({ adminId });
  let activeDoctors = await Doctor.countDocuments({ adminId });
  let villagesCoveredData = await Camp.find({ adminId }).distinct("villageName");
  let villagesCovered = villagesCoveredData.length;
  // console.log(villagesCovered);
  res.json({
    totalCamps,
    activeDoctors,
    villagesCovered, ok:true});
}));

module.exports = router;