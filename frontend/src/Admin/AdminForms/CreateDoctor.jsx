import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

const API_URL = import.meta.env.VITE_API;

export default function CreateDoctor() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const {adminId} = useParams();
    let [doctor, setDoctor] = useState({
        name: "",
        email: "",
        password: "",
        specialization: ""
    });

    let handleChange = (e) => {
        let field = e.target.name;
        let value = e.target.value;

        setDoctor((prev) => ({ ...prev, [field]: value }));
    };

    let handleDoctorForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let res = await fetch(
                `${API_URL}/admin/${adminId}/create/doctor`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(doctor),
                    credentials: "include"
                }
            );

            let dataBack = await res.json();
            // console.log(dataBack);
            if(dataBack.ok && !dataBack.ok) {
                alert("Unauthorized Access");
                return;
            }

            // clear form
            setDoctor({
                name: "",
                email: "",
                password: "",
                specialization: ""
            });
            alert("Doctor created successfully!");
        } catch (error) {
            console.error("Error creating doctor:", error);
            alert("Failed to create doctor. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 p-4" style={{ perspective: '1200px' }}>
            {/* Animated 3D Background */}
            <style>{`
              @keyframes slideInRight { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
              @keyframes cardEntrance3D {
                0% { transform: translateZ(-500px) rotateX(20deg) rotateY(-20deg) scale(0.8); opacity: 0; }
                100% { transform: translateZ(40px) rotateX(0deg) rotateY(0deg) scale(1); opacity: 1; }
              }
              @keyframes cardFloat3D {
                0%, 100% { transform: translateZ(40px) rotateX(2deg) rotateY(-2deg); }
                50% { transform: translateZ(60px) rotateX(-2deg) rotateY(2deg); }
              }
              @keyframes blobBounce {
                0%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
                50% { transform: translateY(-40px) scale(1.1) rotate(10deg); }
              }
            `}</style>

            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 -left-10 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl mix-blend-multiply filter" style={{ animation: 'blobBounce 10s infinite' }}></div>
                <div className="absolute top-40 right-10 w-80 h-80 bg-teal-300/30 rounded-full blur-3xl mix-blend-multiply filter" style={{ animation: 'blobBounce 12s infinite 2s' }}></div>
                <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl mix-blend-multiply filter" style={{ animation: 'blobBounce 14s infinite 4s' }}></div>
            </div>

            <form
                onSubmit={handleDoctorForm}
                className="relative bg-white/70 backdrop-blur-3xl shadow-[0_20px_50px_rgb(0,0,0,0.15)] rounded-3xl p-8 sm:p-10 w-full max-w-lg border border-white/80 z-10 transition-all duration-500 hover:shadow-[0_30px_60px_rgb(0,0,0,0.2)] text-slate-800"
                style={{ animation: 'cardEntrance3D 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, cardFloat3D 8s ease-in-out infinite 1s', transformStyle: 'preserve-3d' }}
            >
                <div className="text-center mb-8 [transform:translateZ(20px)]">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 mb-4 shadow-inner border border-white">
                        <i className="fa-solid fa-user-doctor text-3xl text-emerald-600 drop-shadow-sm"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Onboard Doctor</h2>
                    <p className="text-slate-500 mt-2 font-medium">Add a new medical professional to the roster</p>
                </div>

                <div className="space-y-4 [transform:translateZ(10px)]">
                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="block text-sm font-semibold text-slate-700 transition-colors">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={doctor.name}
                            onChange={handleChange}
                            placeholder="Dr. Jane Doe"
                            className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-700 placeholder:font-normal"
                        />
                    </div>

                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="block text-sm font-semibold text-slate-700 transition-colors">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={doctor.email}
                            onChange={handleChange}
                            placeholder="doctor@hospital.com"
                            className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-700 placeholder:font-normal"
                        />
                    </div>

                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="block text-sm font-semibold text-slate-700 transition-colors">Account Password</label>
                        <input
                            type="password"
                            name="password"
                            value={doctor.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-700 placeholder:font-normal"
                        />
                    </div>

                    <div className="space-y-1.5 focus-within:text-emerald-600 transition-colors">
                        <label className="block text-sm font-semibold text-slate-700 transition-colors">Specialization</label>
                        <input
                            type="text"
                            name="specialization"
                            value={doctor.specialization}
                            onChange={handleChange}
                            placeholder="e.g. Cardiologist, Dentist"
                            className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-700 placeholder:font-normal"
                        />
                    </div>

                    <div className="flex gap-4 pt-4 mt-6 border-t border-slate-200/60">
                        <button type="button" onClick={() => navigate(-1)} className="w-1/3 py-3.5 border border-slate-300 text-slate-700 rounded-xl font-bold bg-white/50 hover:bg-white hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit" className="w-2/3 py-3.5 border border-transparent rounded-xl shadow-[0_5px_15px_rgba(16,185,129,0.3)] text-white font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5 transition-all duration-200">
                            Add Doctor
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
