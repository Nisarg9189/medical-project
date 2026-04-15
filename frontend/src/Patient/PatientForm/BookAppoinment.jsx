import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

const API_URL = import.meta.env.VITE_API;

export default function BookAppointment() {
  const { setLoading } = useLoading();
  const { patientId } = useParams();
  const navigate = useNavigate();
  console.log("Patient ID in BookAppointment:", patientId);
  const [form, setForm] = useState({
    age: "",
    camp: "",
    appointmentDate: "",
    appointmentTime: "",
    gender: "",
    doctor: "",
    appointmentType: "offline"
  });

  const [camps, setCamps] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [bookingMode, setBookingMode] = useState("camp"); // "camp" or "doctor"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let bookedDate = await fetch(`${API_URL}/patient/book-appontment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...form, patientId: patientId}),
        credentials: "include"
      })
      let res = await bookedDate.json();
      if(!res.ok) {
        alert("Error booking appointment");
        return;
      }
      // console.log("Appointment Data:", form);
      const selectedDoctorDoc = bookingMode === "doctor" ? doctors.find(d => d._id === form.doctor) : null;
      setForm({
        age: "",
        camp: "",
        appointmentDate: "",
        appointmentTime: "",
        gender: "",
        doctor: "",
        appointmentType: "offline"
      });
      navigate(`/${patientId}/payment`, { state: { 
          appointment: form, 
          patientId: patientId,
          fee: selectedDoctorDoc ? selectedDoctorDoc.appointmentFee : 0,
          doctorName: selectedDoctorDoc ? selectedDoctorDoc.name : 'Unknown',
          patientName: "Patient"
      } });
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const collectCamps = async () => {
    try {
      let response = await fetch(`${API_URL}/utils/camps`, {
        method: "GET",
        credentials: "include"
      });
      let data = await response.json();
      if(data.ok === false) {
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
  const collectDoctors = async () => {
    try {
      let response = await fetch(`${API_URL}/utils/doctors`, { method: "GET", credentials: "include" });
      let data = await response.json();
      if(data.ok === false) return;
      setDoctors(data);
    } catch (e) {}
  };
  collectDoctors();
  }, []);


  return (
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 font-sans" style={{ perspective: '1200px' }}>
            {/* Ambient Animations */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[80px] mix-blend-screen animate-[blobBounce_10s_infinite_alternate]"></div>
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-[80px] mix-blend-screen animate-[blobBounce_12s_infinite_alternate_reverse]"></div>
            </div>

            <style>{`
                @keyframes formEntrance {
                    from { opacity: 0; transform: translateZ(-200px) rotateX(10deg); }
                    to { opacity: 1; transform: translateZ(0) rotateX(0); }
                }
                @keyframes blobBounce {
                    0% { transform: translateY(0) scale(1); }
                    100% { transform: translateY(-30px) scale(1.1); }
                }
            `}</style>

            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 sm:p-12 border border-white/60 space-y-6"
                style={{ animation: 'formEntrance 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}
            >
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4 shadow-inner border border-white">
                        <i className="fa-solid fa-calendar-check text-3xl text-emerald-600 drop-shadow-sm"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Book Appointment</h2>
                    <p className="text-slate-500 mt-2 font-medium">Schedule your visit to a medical camp</p>
                </div>

                
                {/* Booking Mode */}
                <div className="flex justify-center gap-4 mb-6">
                   <button type="button" onClick={() => setBookingMode("camp")} className={`px-6 py-2 rounded-xl font-bold ${bookingMode === "camp" ? "bg-emerald-500 text-white shadow-md" : "bg-emerald-50 text-emerald-600"}`}>Camp Booking</button>
                   <button type="button" onClick={() => setBookingMode("doctor")} className={`px-6 py-2 rounded-xl font-bold ${bookingMode === "doctor" ? "bg-emerald-500 text-white shadow-md" : "bg-emerald-50 text-emerald-600"}`}>Direct Doctor Booking</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Age */}
                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                             Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            placeholder="Enter age"
                            value={form.age}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Gender */}
                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                             Gender
                        </label>
                        <select
                            name="gender"
                            value={form.gender}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 flex-1 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner appearance-none relative"
                            onChange={handleChange}
                            required
                            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2364748B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                        >
                            <option value="">Select gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Appointment Date */}
                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                            Date
                        </label>
                        <input
                            type="date"
                            name="appointmentDate"
                            value={form.appointmentDate}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Appointment Time */}
                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                             Time
                        </label>
                        <input
                            type="time"
                            name="appointmentTime"
                            value={form.appointmentTime}
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                
                {/* Choose camp */}
                {bookingMode === "camp" && (
                <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                    <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                        <i className="fa-solid fa-tent"></i> Camp
                    </label>
                    <select
                        name="camp"
                        value={form.camp}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner appearance-none relative"
                        onChange={handleChange}
                        required
                        style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2364748B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                    >
                        <option value="">Select camp</option>
                        {camps.map((camp) => (
                        <option key={camp._id} value={camp._id}>{(camp.CampType || "Unknown Type").toUpperCase()}</option>
                        ))}
                    </select>
                </div>
                )}
                
                {/* Choose doctor directly */}
                {bookingMode === "doctor" && (
                <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                    <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                        <i className="fa-solid fa-user-doctor"></i> Doctor
                    </label>
                    <select
                        name="doctor"
                        value={form.doctor}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner appearance-none relative"
                        onChange={handleChange}
                        required
                        style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2364748B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>{doc.name} ({doc.specialization}) - Fees: ₹{doc.appointmentFee || 0} - Loc: {doc.location || 'N/A'}</option>
                        ))}
                    </select>
                    {form.doctor && doctors.find(d => d._id === form.doctor) && (
                      <p className="text-sm text-emerald-600 mt-2 font-semibold">
                         Fee: ₹{doctors.find(d => d._id === form.doctor).appointmentFee || 0} | Location: {doctors.find(d => d._id === form.doctor).location || 'Not Specified'}
                      </p>
                    )}
                </div>
                )}


                {/* Appoinment Type */}
                <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                    <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                        <i className="fa-solid fa-video"></i> Appointment Type
                    </label>
                    <select
                        name="appointmentType"
                        value={form.appointmentType}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 focus:bg-white transition-all shadow-inner appearance-none relative"
                        onChange={handleChange}
                        style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2364748B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                        // required
                    >
                        <option value="">Choose a Type</option>
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                    </select>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-1/3 py-4 border border-slate-300 text-slate-700 rounded-xl font-bold bg-white/50 hover:bg-white hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Back
                    </button>
                    <button
                        type="submit"
                        className="w-2/3 py-4 border border-transparent rounded-xl shadow-[0_5px_15px_rgba(16,185,129,0.3)] text-white font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <i className="fa-solid fa-check"></i> Book Appointment
                    </button>
                </div>
            </form>
        </div>
    );
}
