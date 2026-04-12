import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

const API_URL = import.meta.env.VITE_API;

export default function AddDiagnosis() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const {appointmentId} = useParams();
  console.log("Appointment ID:", appointmentId);
  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    prescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await fetch(`${API_URL}/doctors/addDiagnosis/${appointmentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      let data = await response.json();
      if(data.ok === false) {
        alert("Error");
        return;
      }
      // console.log("Response Data:", data);
      alert("Diagnosis added successfully!");
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error("Error adding diagnosis:", error);
      alert("Failed to add diagnosis. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] font-sans" style={{ perspective: '1200px' }}>
      {/* 3D Glassmorphic Overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"></div>
      
      {/* Ambient Animations inside Modal layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[80px] mix-blend-screen animate-[blobBounce_10s_infinite_alternate]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-[80px] mix-blend-screen animate-[blobBounce_12s_infinite_alternate_reverse]"></div>
      </div>

      <style>{`
        @keyframes modalEntrance3D {
          0% { transform: translateZ(-300px) scale(0.9) rotateX(10deg); opacity: 0; }
          100% { transform: translateZ(0px) scale(1) rotateX(0deg); opacity: 1; }
        }
        @keyframes blobBounce {
          0% { transform: translateY(0) scale(1); }
          100% { transform: translateY(-30px) scale(1.1); }
        }
      `}</style>

      {/* 3D Glass Modal */}
      <div 
        className="relative bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] rounded-[2.5rem] max-w-2xl w-full p-8 sm:p-10 z-10 mx-4 border border-white/60"
        style={{ animation: 'modalEntrance3D 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}
      >
        <button
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 text-slate-500 hover:bg-rose-100 hover:text-rose-600 transition-colors flex items-center justify-center shadow-inner" 
          onClick={() => navigate(-1)}
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <form onSubmit={handleSubmit} className="relative z-10 w-full">
          {/* Header */}
          <div className="mb-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mb-4 shadow-inner border border-white">
                <i className="fa-solid fa-notes-medical text-3xl text-emerald-600 drop-shadow-sm"></i>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Add Diagnosis</h2>
            <p className="text-slate-500 mt-2 font-medium">Record diagnosis and medical prescription</p>
          </div>

          <div className="space-y-6">
            {/* Symptoms */}
            <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
              <label htmlFor="symptoms" className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                <i className="fa-solid fa-temperature-half"></i> Patient Symptoms
              </label>
              <textarea
                name="symptoms"
                id="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Describe current symptoms..."
                className="w-full h-24 p-4 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-700 resize-none"
                required
              ></textarea>
            </div>

            {/* Diagnosis */}
            <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
              <label htmlFor="diagnosis" className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                <i className="fa-solid fa-stethoscope"></i> Clinical Diagnosis
              </label>
              <textarea
                name="diagnosis"
                id="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="Enter official diagnosis..."
                className="w-full h-24 p-4 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-700 resize-none"
                required
              ></textarea>
            </div>

            {/* Prescription */}
            <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
              <label htmlFor="prescription" className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                <i className="fa-solid fa-pills"></i> Complete Prescription
              </label>
              <textarea
                name="prescription"
                id="prescription"
                value={formData.prescription}
                onChange={handleChange}
                placeholder="Prescribe medications and dosage..."
                className="w-full h-28 p-4 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-700 resize-none"
                required
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => navigate(-1)} className="w-1/3 py-3.5 border border-slate-300 text-slate-700 rounded-xl font-bold bg-white/50 hover:bg-white hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
                    Cancel
                </button>
                <button type="submit" className="w-2/3 py-3.5 border border-transparent rounded-xl shadow-[0_5px_15px_rgba(16,185,129,0.3)] text-white font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5 transition-all duration-200">
                    Save Diagnosis Record
                </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
