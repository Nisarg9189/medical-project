import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API;

export default function DoctorCard({ doctorId }) {
    let [patient, setPatient] = useState({
        pending: 0,
        completed: 0,
        totalPatients: 0
    });

    useEffect(() => {
        // Fetch patient data based on doctorId
        const fetchPatientsCount = async () => {
            let response = await fetch(`${API_URL}/doctors/${doctorId}/appointments`, {
                method: "GET",
                credentials: "include"
            });
            let data = await response.json();
            if(data.ok && !data.ok) {
                alert("Unauthorized Access");
                return;
            }
            // console.log(data);
            setPatient(data);
        }
        fetchPatientsCount();
    }, [doctorId]);
    return (
        <div id="cardList" className="flex gap-6 items-start w-full overflow-x-auto pb-4" style={{ perspective: '1200px' }}>
            {/* Total Patients */}
            <div className="relative group shrink-0 min-w-[280px]">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative px-6 py-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transform transition-all duration-500 group-hover:-translate-y-3 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(20px)] group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-4 shadow-inner border border-slate-100 group-hover:scale-110 transition-transform duration-500">
                        <i className="fa-solid fa-users text-2xl text-slate-400 group-hover:text-emerald-500 transition-colors duration-500"></i>
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Total Patients</p>
                    <p className="text-4xl font-black text-slate-800">{patient.totalPatients}</p>
                </div>
            </div>

            {/* Completed */}
            <div className="relative group shrink-0 min-w-[280px]">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative px-6 py-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transform transition-all duration-500 group-hover:-translate-y-3 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(20px)] group-hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4 shadow-inner border border-emerald-100 group-hover:scale-110 transition-transform duration-500">
                        <i className="fa-solid fa-check text-2xl text-emerald-400 group-hover:text-emerald-500 transition-colors duration-500"></i>
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Completed</p>
                    <p className="text-4xl font-black text-emerald-500">{patient.completed}</p>
                </div>
            </div>

            {/* Pending */}
            <div className="relative group shrink-0 min-w-[280px]">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative px-6 py-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.05)] overflow-hidden transform transition-all duration-500 group-hover:-translate-y-3 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(20px)] group-hover:shadow-[0_20px_40px_rgba(245,158,11,0.15)] flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mb-4 shadow-inner border border-amber-100 group-hover:scale-110 transition-transform duration-500">
                        <i className="fa-regular fa-clock text-2xl text-amber-400 group-hover:text-amber-500 transition-colors duration-500"></i>
                    </div>
                    <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Pending</p>
                    <p className="text-4xl font-black text-amber-500">{patient.pending}</p>
                </div>
            </div>
        </div>
    );
}