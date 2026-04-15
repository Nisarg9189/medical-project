import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API;

export default function GenReports() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    let [camps, setCamps] = useState([]);
    let [selectedCamp, setSelectedCamp] = useState({
        campId: ""
    });

    console.log(camps);
    
    useEffect(() => {
        // Fetch camps for the patient
        let fetchCamps = async () => {
            let res = await fetch(`${API_URL}/patient/camps/${patientId}`, {
                method: "GET",
                credentials: "include"
            });
            let data = await res.json();
            if(data.ok === false) {
                alert("Unauthorized Access");
                return;
            }
            setCamps(data);
        };
        fetchCamps();
    }, [patientId]);

    let selectedCampHandler = (e) => {
        setSelectedCamp({
            ...selectedCamp,
            [e.target.name]: e.target.value
        });
    }

    let downloadReport = async () => {
        if(!selectedCamp.campId) {
            alert("Please select an appointment to download the report.");
            return;
        }

        let res = await fetch(`${API_URL}/patient/${patientId}/report/${selectedCamp.campId}`, {
            method: "GET",
            responseType: "blob",
            credentials: "include"
        });

        if(res.ok) {
            let blob = await res.blob();
            let url = window.URL.createObjectURL(new Blob([blob]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Medical_Report_${selectedCamp.campId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } else {
            alert("Failed to download report. Please try again.");
        }

    }

    return (
        <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-6 bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 font-sans" style={{ perspective: '1200px' }}>
            {/* Ambient Animations */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-[80px] mix-blend-screen animate-[blobBounce_10s_infinite_alternate]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400/20 rounded-full blur-[80px] mix-blend-screen animate-[blobBounce_12s_infinite_alternate_reverse]"></div>
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
            
            <div 
                className="relative z-10 w-full max-w-xl bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] p-8 sm:p-12 border border-white/60"
                style={{ animation: 'formEntrance 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards' }}
            >
                <div className="mb-8 text-center flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 flex items-center justify-center mb-4 shadow-inner border border-white">
                        <i className="fa-solid fa-file-pdf text-3xl text-sky-600 drop-shadow-sm"></i>
                    </div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Medical Reports</h1>
                    <p className="text-slate-500 mt-2 font-medium">Download your medical history securely</p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2 focus-within:text-sky-600 transition-colors">
                        <label className="text-sm font-semibold text-slate-700 transition-colors flex items-center gap-2">
                            <i className="fa-solid fa-notes-medical"></i> Select Finalized Appointment
                        </label>
                        <select
                            className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 focus:bg-white transition-all shadow-inner appearance-none relative"
                            value={selectedCamp.campId}
                            onChange={selectedCampHandler}
                            name="campId"
                            style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="%2364748B"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>')`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.25em' }}
                        >
                            <option value="">-- Choose Appointment --</option>
                            {camps.map((appt) => (
                                <option key={appt._id} value={appt._id}>
                                    {appt.campId ? `Camp: ${appt.campId.CampType} - (${appt.campId.villageName} on ${new Date(appt.campId.Date).toLocaleDateString()})` : `Direct Visit: ${new Date(appt.date).toLocaleDateString()}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-1/3 py-4 border border-slate-300 text-slate-700 rounded-xl font-bold bg-white/50 hover:bg-white hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-arrow-left"></i> Back
                        </button>
                        <button
                            onClick={downloadReport}
                            className="w-2/3 py-4 border border-transparent rounded-xl shadow-[0_5px_15px_rgba(14,165,233,0.3)] text-white font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 hover:shadow-[0_8px_20px_rgba(14,165,233,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <i className="fa-solid fa-download"></i> Download PDF Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}