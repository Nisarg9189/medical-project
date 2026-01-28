const express = require("express");
const router = express.Router({mergeParams: true});
const Admin = require("../models/admin");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const bcrypt = require("bcrypt");
const wrapAsync = require("../utils/wrapAsync");


async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds); // generate salt
}

async function verifyPassword(password, hashPassword) {
  return await bcrypt.compare(password, hashPassword);
}

router.post("/login", wrapAsync(async (req, res) => {
  let { email, password, role } = req.body;
  console.log(req.body);

  let user;
  if (role === "admin") {
    user = await Admin.findOne({ email });
  } else if (role === "doctor") {
    user = await Doctor.findOne({ email });
  } else if (role === "patient") {
    user = await Patient.findOne({ email });
  }


  if (user) {
    const isValid = await verifyPassword(password, user.password);
    if(!isValid) {
      return res.status(401).json({ message: "Invalid credentials", ok: false });
    }
    req.session.user = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: role
  };
    // console.log("User logged in:", req.session.user);
    return res.json({ message: "Login successful", user, ok: true});
  } else {
    return res.status(401).json({ message: "Invalid credentials", ok: false });
  }
}));


// signup
router.post("/signup", wrapAsync(async (req, res) => {
  let { fullName, email, password, role } = req.body;
  // console.log(req.body);
  let existingUser = await Admin.findOne({ email });
  if (existingUser) {
    res.status(400).json({ message: "User already exists", ok: false });
    return;
  }
  password = await hashPassword(password);
  if (role === "admin") {
    let newAdmin = new Admin({
      name :fullName,
      email: email,
      password: password
    });
    await newAdmin.save();
    req.session.user = {
      _id: newAdmin._id,
      name: fullName,
      email: email,
      role: "admin"
    }
    res.json({ message: "Signup successful", user: newAdmin, ok: true });
    return;
  } else if( role === "patient") {
    let newPatient = new Patient({
      name: fullName,
      email,
      password
    });
    await newPatient.save();
    req.session.user = {
      _id: newPatient._id,
      name: fullName,
      email: email,
      role: "patient"
    }
    return res.json({ message: "Signup successful", user: newPatient, ok: true });
  } else {
    res.json({ message: "Signup Unsuccessful", ok: false });
  }
}));

router.get("/logout",(req, res) => {
  req.session.destroy((err) => {
    if(err) {
      // console.log("Error destroying session:", err);
      return res.json({ ok: false, message: "Error logging out" });
    }
    console.log("Session destroyed successfully");
    res.clearCookie("connect.sid");
    return res.json({ message: "Logged out successfully", ok: true});
  });
});

module.exports = router;