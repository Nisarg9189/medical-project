import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function BookAppointment() {
  const { patientId } = useParams();
  console.log("Patient ID in BookAppointment:", patientId);
  const [form, setForm] = useState({
    age: "",
    camp: "",
    appointmentDate: "",
    appointmentTime: "",
    gender: ""
  });

  const [camps, setCamps] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bookedDate = await fetch("https://backend-lugs.onrender.com/patient/book-appontment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...form, patientId: patientId}),
      credentials: "include"
    })
    let res = await bookedDate.json();
    if(!res.ok) {
      alert("Error");
      return;
    }
    // console.log("Appointment Data:", form);
    alert("Appointment booked successfully!");
  };

  useEffect(() => {
    const collectCamps = async () => {
    try {
      let response = await fetch("https://backend-lugs.onrender.com/utils/camps", {
        method: "GET",
        credentials: "include"
      });
      let data = await response.json();
      if(data.ok && !data.ok) {
        alert("Unauthorized Access");
        return;
      }
      // console.log("Camps Data:", data);
      setCamps(data);
    } catch (error) {
      // console.error("Error fetching camps:", error);
    }
  }
  collectCamps();
  }, []);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6 space-y-5 border-t-4 border-green-500"
      >
        <h2 className="text-2xl font-bold text-gray-800">Book Appointment</h2>
        <p className="text-sm text-gray-500 mb-4">
          Fill in the details to schedule your appointment
        </p>

        {/* Patient Name */}
        {/* <div>
          <label className="text-sm font-medium">Patient Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Age */}
        <div>
          <label className="text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Enter age"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-medium">Gender</label>
          <select
            name="gender"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {/* Choose camp */}
        <div>
          <label className="text-sm font-medium">Camp</label>
          <select
            name="camp"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          >
            <option value="">Select camp</option>
            {camps.map((camp) => (
              <option key={camp._id} value={camp._id}>{(camp.CampType).toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Phone */}
        {/* <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          />
        </div> */}

        {/* Symptoms */}
        {/* <div>
          <label className="text-sm font-medium">Symptoms</label>
          <textarea
            name="symptoms"
            placeholder="Describe your symptoms"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            rows="3"
            onChange={handleChange}
            required
          ></textarea>
        </div> */}

        {/* Appointment Date */}
        <div>
          <label className="text-sm font-medium">Appointment Date</label>
          <input
            type="date"
            name="appointmentDate"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          />
        </div>

        {/* Appointment Time */}
        <div>
          <label className="text-sm font-medium">Appointment Time</label>
          <input
            type="time"
            name="appointmentTime"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          />
        </div>

        {/* Doctor
        <div>
          <label className="text-sm font-medium">Select Doctor</label>
          <select
            name="doctor"
            className="w-full mt-1 border p-2 rounded focus:ring focus:ring-green-300"
            onChange={handleChange}
            required
          >
            <option value="">Choose a doctor</option>
            <option value="Dr. Sharma">Dr. Sharma</option>
            <option value="Dr. Patel">Dr. Patel</option>
            <option value="Dr. Mehta">Dr. Mehta</option>
          </select>
        </div> */}

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}
