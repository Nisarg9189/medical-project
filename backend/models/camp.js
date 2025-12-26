const mongoose = require("mongoose");

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ruralhospital');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

let campSchema = new mongoose.Schema({
    villageName: {
        type: String,
        required: true
    },

    AssignDoctor: {
       type: mongoose.Types.ObjectId,
       required: true,
       ref: "Doctor"
    },

    CampType: {
        type: String,
        required: true
    },

    Date: {
        type: Date,
        default: Date.now()
    },

    Time: {
        type: String,
        required: true
    },

    adminId: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true
    }
});

const Camp = mongoose.model("Camp", campSchema);

module.exports = Camp;