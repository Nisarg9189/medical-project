const mongoose = require("mongoose");

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ruralhospital');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }


let appoinmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    doctorId: {
        type: mongoose.Types.ObjectId,
        ref: "Doctor",
        required: true
    },

    campId: {
        type: mongoose.Types.ObjectId,
        ref: "Camp",
        required: true
    },

    date: {
        type: Date,
        default: Date.now()
    },

    time: {
        type: String,
        // required: true
    },

    Gender: {
        type: String,
        // required: true
    },

    Age: {
        type: Number,
        // required: true
    },

    symptoms: {
        type: String,
        default: ""
    },

    diagnosis: {
        type: String,
        default: ""
    },

    prescription: {
        type: String,
        default: ""
    },

    isDone: {
        type: Boolean,
        default: false
    },

});

let Appoinment = mongoose.model("Appoinment", appoinmentSchema);

module.exports = Appoinment;