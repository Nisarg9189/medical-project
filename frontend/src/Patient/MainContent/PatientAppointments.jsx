import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API;

export default function PatientAppointments({ patientId }) {
    let [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                let res = await fetch(`${API_URL}/patient/${patientId}/appointments`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!res.ok) {
                    console.log("Unauthorized or failed request");
                    return;
                }
                let data = await res.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        }
        fetchAppointments();
    }, [patientId]);

    return (
        <div className="w-full mt-6" style={{ perspective: '1200px' }}>
            <style>{`
              @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(20px) translateZ(-50px) rotateX(10deg); }
                to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0); }
              }
              .appointment-card-animated {
                animation: slideUpFade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                opacity: 0;
              }
            `}</style>
            
            <div id="appointmentList" className="overflow-y-auto max-h-[450px] w-full space-y-4 pr-2">
                {appointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <i className="fa-solid fa-calendar-xmark text-4xl mb-3 opacity-50"></i>
                        <p className="font-medium text-lg">No upcoming registered appointments.</p>
                    </div>
                ) : (
                    appointments.map((appointment, i) => (
                        <div key={appointment._id} 
                            className="appointment-card-animated w-full px-6 py-6 flex flex-col md:flex-row justify-between items-center rounded-2xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 hover:border-emerald-300 hover:shadow-[0_10px_25px_rgba(16,185,129,0.15)] transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] gap-6 group relative overflow-hidden"
                            style={{ animationDelay: `${(i % 5) * 0.1}s` }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500"></div>

                            <div className="flex-1 min-w-0 ml-2">
                                <p className="font-black text-xl text-slate-800 drop-shadow-sm flex items-center gap-3 tracking-tight">
                                    <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 shadow-inner">
                                        <i className="fa-solid fa-stethoscope"></i>
                                    </span>
                                    Dr. {appointment.doctorId?.name || "Unassigned"}
                                </p>
                                <div className="flex flex-wrap gap-3 mt-3 text-sm font-medium text-slate-500 md:ml-[3.25rem]">
                                    <p className="flex items-center gap-1.5 bg-sky-50 text-sky-600 px-3 py-1 rounded-full"><i className="fa-solid fa-tent text-sky-400"></i> {appointment.campId?.CampType || "Unknown Camp"}</p>
                                    <p className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full"><i className="fa-regular fa-calendar text-indigo-400"></i> {appointment.campId?.Date ? new Date(appointment.campId.Date).toLocaleDateString() : new Date(appointment.date).toLocaleDateString()}</p>
                                    {appointment.time && <p className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full"><i className="fa-regular fa-clock text-amber-400"></i> {appointment.time}</p>}
                                </div>
                            </div>
                            <div className="shrink-0 px-4 py-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl truncate cursor-default border border-emerald-200 shadow-sm">
                                Registered
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
