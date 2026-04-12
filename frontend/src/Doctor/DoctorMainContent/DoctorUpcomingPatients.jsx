import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

export default function DoctorUpcomingPatients({ doctorId }) {
    const navigate = useNavigate();
    let [patients, setPatients] = useState([]);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalPages, setTotalPages] = useState(1);
    let [totalCount, setTotalCount] = useState(0);
    let [loading, setLoading] = useState(false);
    let [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true);
                let response = await fetch(`${API_URL}/doctors/${doctorId}/patients/paginated?page=${currentPage}&limit=4&date=${selectedDate}`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!response.ok) {
                    console.log("Unauthorized or failed request");
                    return;
                }
                let data = await response.json();
                setPatients(data.appointments || []);
                setTotalPages(data.totalPages || 1);
                setTotalCount(data.totalCount || 0);
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchPatients();
    }, [doctorId, currentPage, selectedDate]);

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

            {/* Header with count and Date picker */}
            <div className="flex items-center justify-between mb-4 px-1">
                 <div>
                    <label className="text-sm font-semibold text-slate-500 mr-2">Sort by Date:</label>
                    <input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition"
                    />
                 </div>
                 {totalCount > 0 && (
                 <p className="text-sm font-semibold text-slate-400">
                     Showing {(currentPage - 1) * 4 + 1}–{Math.min(currentPage * 4, totalCount)} of {totalCount} appointments
                 </p>
                 )}
            </div>

            <div id="cardList" className="-mt-1 w-full min-w-fit space-y-4 pr-2">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                        <svg className="animate-spin w-8 h-8 text-emerald-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                        </svg>
                        <p className="font-medium">Loading appointments...</p>
                    </div>
                ) : patients.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
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
                                    {appointment.patientId?.name || "Unknown Patient"}
                                </p>
                                <div className="flex flex-wrap gap-3 mt-3 text-sm font-medium text-slate-500 ml-[3.25rem]">
                                    <p className="flex items-center gap-1.5 bg-sky-50 text-sky-600 px-3 py-1 rounded-full"><i className="fa-solid fa-tent text-sky-400"></i> {appointment.campId?.CampType || "Unknown"}</p>
                                    <p className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full"><i className="fa-solid fa-location-dot text-amber-400"></i> {appointment.campId?.villageName || "Unknown"}</p>
                                    <p className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full"><i className="fa-regular fa-calendar text-indigo-400"></i> {appointment.date ? new Date(appointment.date).toLocaleDateString() : "N/A"}</p>
                                    {appointment.time && <p className="flex items-center gap-1.5 bg-purple-50 text-purple-600 px-3 py-1 rounded-full"><i className="fa-regular fa-clock text-purple-400"></i> {appointment.time}</p>}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-200/60">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                            currentPage === 1
                                ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                                : "bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-md active:scale-95"
                        }`}
                    >
                        <i className="fa-solid fa-chevron-left text-xs"></i> Previous
                    </button>

                    <div className="flex items-center gap-1 mx-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 ${
                                    page === currentPage
                                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200 scale-110"
                                        : "bg-white border border-slate-200 text-slate-500 hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50"
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                            currentPage === totalPages
                                ? "bg-slate-100 text-slate-300 cursor-not-allowed"
                                : "bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 hover:shadow-md active:scale-95"
                        }`}
                    >
                        Next <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                </div>
            )}
        </div>
    );
}