import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

export default function DoctorUpcomingPatients({ doctorId }) {
    const navigate = useNavigate();
    let [patients, setPatients] = useState([]);

    useEffect(() => {
        //fetch patients data from backend
        const fetchPatients = async () => {
            try {
                let response = await fetch(`${API_URL}/doctors/${doctorId}/patients`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    alert("Unauthorized Access!");
                    return;
                }
                let data = await response.json();
                if (data.ok && !data.ok) {
                    alert("Unauthorized Access");
                    return;
                }
                // console.log("Patients Data:", data);
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }
        fetchPatients();
    }, []);
    return (
        <div className="overflow-x-auto w-full p-2" style={{ perspective: '1200px' }}>
            <style>{`
              @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(20px) translateZ(-50px) rotateX(10deg); }
                to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0); }
              }
              .patient-card-animated {
                animation: slideUpFade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                opacity: 0;
              }
            `}</style>

            <div id="cardList" className="-mt-1 overflow-y-auto h-[450px] w-full min-w-fit space-y-4 pr-2">
                {patients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <i className="fa-solid fa-bed-pulse text-4xl mb-3 opacity-50"></i>
                        <p className="font-medium text-lg">No upcoming patients at the moment.</p>
                    </div>
                ) : (
                    patients.map((appointment, i) => (
                        <div key={appointment._id}
                            className="patient-card-animated min-w-fit w-full px-6 py-6 flex justify-between items-center rounded-2xl bg-gradient-to-r from-emerald-50 to-white border border-emerald-100 hover:border-emerald-300 hover:shadow-[0_10px_25px_rgba(16,185,129,0.15)] transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] gap-8 group relative overflow-hidden"
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-teal-500"></div>

                            <div className="shrink-0 overflow-x-auto ml-2">
                                <p className="font-bold text-xl text-slate-800 drop-shadow-sm flex items-center gap-3">
                                    <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 shadow-inner">
                                        <i className="fa-regular fa-user"></i>
                                    </span>
                                    {appointment.patientId.name}
                                </p>
                                <div className="flex gap-4 mt-3 text-sm font-medium text-slate-500 ml-[3.25rem]">
                                    <p className="flex items-center gap-1.5 bg-sky-50 text-sky-600 px-3 py-1 rounded-full"><i className="fa-solid fa-tent text-sky-400"></i> {appointment.campId.CampType}</p>
                                    <p className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full"><i className="fa-solid fa-location-dot text-amber-400"></i> {appointment.campId.villageName}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => navigate(`/addDiagnosis/${appointment._id}`)}
                                    className="shrink-0 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white font-bold shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:from-emerald-600 hover:to-teal-700 hover:shadow-[0_8px_20px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-stethoscope"></i> Add Diagnosis
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}