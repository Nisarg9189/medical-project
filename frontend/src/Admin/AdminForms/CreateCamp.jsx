import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLoading } from "../../LoadingContext";
import { useContext } from "react";
import { ErrorContext } from "../../ErrorContext";

const API_URL = import.meta.env.VITE_API;

export default function CreateCamp() {
    const { setLoading } = useLoading();
    const { error, setError } = useContext(ErrorContext);
    const navigate = useNavigate();
    const { adminId } = useParams();
    const [flash, setFlash] = useState("");

    let [data, setData] = useState({
        villageName: "",
        Date: "",
        Time: "",
        doctorId: ""
    });

    let [doctors, setDoctors] = useState([]);

    useEffect(() => {

        const fetchDoctors = async () => {
            try {
                let r = await fetch(`${API_URL}/admin/${adminId}/doctors`, {
                    method: "GET",
                    credentials: "include"
                });
                let doctors = await r.json();
                if (doctors.ok && !doctors.ok) {
                    setFlash("Unauthorized Access");
                    return;
                }
                // console.log(doctors);
                setDoctors(doctors);
            } catch (error) {
                // console.error("Error fetching doctors:", error);
                setError("Failed to fetch doctors. Please try again.");
            }
        };

        fetchDoctors();

    }, []);

    let handleSubmit = (e) => {
        // console.log(e.target.value);
        // console.log(e.target.name);

        let field = e.target.name;
        let newVal = e.target.value;

        setData((currData) => {
            if (field === "doctorId") {
                newVal = newVal.toString();
            }
            currData[field] = newVal;
            return { ...currData };
        })
    }

    let handleCampForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let r = await fetch(`${API_URL}/admin/${adminId}/create/camp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });
            // console.log(r.status);
            let backEndData = await r.json();
            if (backEndData.ok && !backEndData.ok) {
                alert("Unauthorized Access");
                return;
            }
            // console.log(backEndData);
            // console.log(data);
            setData({
                villageName: "",
                Date: "",
                Time: "",
                doctorId: ""
            })
            // alert("Camp created successfully!");
            setFlash("Camp created successfully");
        } catch (error) {
            // console.error("Error creating camp:", error);
            setError("Failed to create camp. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (flash) {
            setTimeout(() => {
                setFlash("");
            }, 3000);
        }
    })

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50 p-4" style={{ perspective: '1200px' }}>
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
                <div className="absolute top-10 -left-10 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl mix-blend-multiply filter" style={{ animation: 'blobBounce 10s infinite' }}></div>
                <div className="absolute top-40 right-10 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl mix-blend-multiply filter" style={{ animation: 'blobBounce 12s infinite 2s' }}></div>
                <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl mix-blend-multiply filter" style={{ animation: 'blobBounce 14s infinite 4s' }}></div>
            </div>

            {flash && (
                <div className="fixed top-8 right-8 bg-emerald-500/95 text-white backdrop-blur-lg px-6 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-3 animate-[slideInRight_0.4s_ease-out]">
                    <div className="bg-white/20 rounded-full p-1">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <p className="font-medium text-lg">{flash}</p>
                </div>
            )}

            <form
                onSubmit={handleCampForm}
                className="relative bg-white/70 backdrop-blur-3xl shadow-[0_20px_50px_rgb(0,0,0,0.15)] rounded-3xl p-8 sm:p-10 w-full max-w-lg border border-white/80 z-10 transition-all duration-500 hover:shadow-[0_30px_60px_rgb(0,0,0,0.2)] text-slate-800"
                style={{ animation: 'cardEntrance3D 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards, cardFloat3D 8s ease-in-out infinite 1s', transformStyle: 'preserve-3d' }}
            >
                {error && (
                    <div className="mb-6 p-4 bg-rose-50/90 backdrop-blur-md text-rose-700 border-l-4 border-rose-500 rounded-r-xl shadow-sm flex justify-between items-center transition-all">
                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
                            <p className="font-medium text-sm">{error}</p>
                        </div>
                        <button type="button" className="text-rose-400 hover:text-rose-700 transition-colors bg-rose-100/50 hover:bg-rose-200 rounded-full w-8 h-8 flex items-center justify-center p-1" onClick={() => setError(null)}>✕</button>
                    </div>
                )}
                
                <div className="text-center mb-8 [transform:translateZ(20px)]">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-100 to-indigo-100 mb-4 shadow-inner border border-white">
                        <i className="fa-solid fa-tent text-3xl text-sky-600 drop-shadow-sm"></i>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Deploy Medical Camp</h2>
                    <p className="text-slate-500 mt-2 font-medium">Coordinate a new healthcare initiative</p>
                </div>

                <div className="space-y-5 [transform:translateZ(10px)]">
                    <div className="space-y-1.5 focus-within:text-sky-600 transition-colors">
                        <label htmlFor="villageName" className="block text-sm font-semibold text-slate-700 transition-colors">Target Village</label>
                        <input
                            type="text"
                            placeholder="Enter village name"
                            id="villageName"
                            name="villageName"
                            value={data.villageName}
                            onChange={handleSubmit}
                            className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all shadow-sm font-medium text-slate-700 placeholder:font-normal"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <div className="space-y-1.5 focus-within:text-sky-600 transition-colors">
                            <label htmlFor="Date" className="block text-sm font-semibold text-slate-700 transition-colors">Scheduled Date</label>
                            <input
                                type="date"
                                id="Date"
                                name="Date"
                                value={data.Date}
                                onChange={handleSubmit}
                                className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all shadow-sm font-medium text-slate-700"
                            />
                        </div>

                        <div className="space-y-1.5 focus-within:text-sky-600 transition-colors">
                            <label htmlFor="Time" className="block text-sm font-semibold text-slate-700 transition-colors">Operational Time</label>
                            <input
                                type="time"
                                id="Time"
                                name="Time"
                                value={data.Time}
                                onChange={handleSubmit}
                                className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all shadow-sm font-medium text-slate-700"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5 focus-within:text-sky-600 transition-colors">
                        <label htmlFor="CampType" className="block text-sm font-semibold text-slate-700 transition-colors">Assign Lead Doctor</label>
                        <div className="relative">
                            <select className="w-full p-3.5 bg-white/60 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500 transition-all shadow-sm appearance-none font-medium text-slate-700" name="doctorId" value={data.doctorId} onChange={handleSubmit}>
                                <option value="">Select an available doctor</option>
                                {doctors.map((doctors) => (
                                    <option key={doctors._id} value={doctors._id}>
                                        Dr. {doctors.name} — {doctors.specialization}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                <i className="fa-solid fa-chevron-down text-sm"></i>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 mt-6 border-t border-slate-200/60">
                        <button type="button" onClick={() => navigate(-1)} className="w-1/3 py-3.5 border border-slate-300 text-slate-700 rounded-xl font-bold bg-white/50 hover:bg-white hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200">
                            Cancel
                        </button>
                        <button type="submit" className="w-2/3 py-3.5 border border-transparent rounded-xl shadow-[0_5px_15px_rgba(14,165,233,0.3)] text-white font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 hover:shadow-[0_8px_20px_rgba(14,165,233,0.4)] transform hover:-translate-y-0.5 transition-all duration-200">
                            Launch Camp
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
