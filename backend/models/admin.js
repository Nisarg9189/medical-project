const mongoose = require("mongoose");


// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://127.0.0.1:27017/ruralhospital');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }

let adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },


    email: {
        required: true,
        type: String
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        default: "admin"
    }

});

// adminSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

let Admin = mongoose.model("Admin", adminSchema);

let addData = async () => {
    let addAdmin = new Admin({
    name: "Nisarg",
    organizationName: "rotary club",
    address: "visnagar"
    });

    let adminData = await addAdmin.save();
    console.log(adminData);
}

// addData();

module.exports = Admin;