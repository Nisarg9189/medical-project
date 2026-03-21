import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreateForm({patientId}) {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col gap-6 w-full" style={{ perspective: '1200px' }}>
            <div className="group relative w-full h-[220px]">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative h-full px-8 py-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transform transition-all duration-500 group-hover:-translate-y-2 group-hover:[transform:rotateX(4deg)_rotateY(-2deg)_translateZ(20px)] group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 shadow-inner border border-emerald-100 group-hover:scale-110 group-hover:[transform:rotateY(180deg)] transition-transform duration-700">
                            <i className="fa-solid fa-suitcase-medical text-2xl text-emerald-500"></i>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Book Appointment</h3>
                        <p className="text-slate-500 font-medium text-sm mt-1">Schedule your visit to the medical camp</p>
                    </div>
                    <button type="button" onClick={() => navigate(`/${patientId}/book`)} className="w-full bg-emerald-50 text-emerald-600 font-bold px-4 py-3 rounded-xl border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-[0_5px_15px_rgba(16,185,129,0.3)]">
                        Book Now
                    </button>
                </div>
            </div>

            <div className="group relative w-full h-[220px]">
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative h-full px-8 py-8 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transform transition-all duration-500 group-hover:-translate-y-2 group-hover:[transform:rotateX(4deg)_rotateY(2deg)_translateZ(20px)] group-hover:shadow-[0_20px_40px_rgba(14,165,233,0.15)] flex flex-col justify-between">
                    <div>
                        <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mb-4 shadow-inner border border-sky-100 group-hover:scale-110 group-hover:[transform:rotateY(-180deg)] transition-transform duration-700">
                            <i className="fa-solid fa-file-medical text-2xl text-sky-500"></i>
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">My Reports</h3>
                        <p className="text-slate-500 font-medium text-sm mt-1">View and download your medical reports</p>
                    </div>
                    <button type="button" onClick={() => navigate(`/${patientId}/reports`)} className="w-full bg-sky-50 text-sky-600 font-bold px-4 py-3 rounded-xl border border-sky-100 group-hover:bg-sky-500 group-hover:text-white group-hover:border-transparent transition-all duration-300 shadow-sm group-hover:shadow-[0_5px_15px_rgba(14,165,233,0.3)]">
                        View Reports
                    </button>
                </div>
            </div>
        </div>

    );
}