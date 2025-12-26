const mongoose = require("mongoose");


// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ruralhospital');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

let docotrSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    adminId: {
        type: mongoose.Types.ObjectId,
        ref: "Admin"
    },

    role: {
        type: String,
        default: "doctor"
    },

    password: {
        type: String,
        required: true
    },

    specialization: {
        type: String,
        default: ""
    }

});


let Doctor = mongoose.model("Doctor", docotrSchema);

let addData = async () => {
    let addDoctor = new Doctor({
    name: "jensy",
    email: "jensy@gmail.com",
    adminId: "692939537b6d45cd33a3b23e"
    });

    let docotrData = await addDoctor.save();
    console.log(docotrData);
}

// addData();

module.exports = Doctor;