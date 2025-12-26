const mongoose = require("mongoose");


// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ruralhospital');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

let patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    // doctorId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Doctor"
    // },

    // campId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Camp"
    // },

    role: {
        type: String,
        default: "patient"
    }

});


let Patient = mongoose.model("Patient", patientSchema);

let addData = async () => {
    let addPatient = new Patient({
    name: "bob",
    email: "bob@gmail.com",
    doctorId: "692940e0e3d600f96a2c0cde",
    campId: "692b0f53648360591bfa2564"
    });

    let patientData = await addPatient.save();
    console.log(patientData);
}

// addData();

module.exports = Patient;