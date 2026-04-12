import { useState, useEffect } from "react";
import { useLoading } from "../../LoadingContext";
import { useContext } from "react";
import { ErrorContext } from "../../ErrorContext";
import CancleRegistration from "./CancleRegistration";
import PatientJoinMeet from "./PatientJoinMeet";

const API_URL = import.meta.env.VITE_API;

export default function PatientsUpcomingCamps({ patientId }) {
    const { setLoading } = useLoading();
    let [camps, setCamps] = useState([]);
    const [lastId, setLastId] = useState(null);

    const { error, setError } = useContext(ErrorContext);

    useEffect(() => {
        let fetchCamps = async () => {
            try {
                let res = await fetch(`${API_URL}/utils/camps?lastId=${lastId ? lastId : ""}`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!res.ok) {
                    console.log("Unauthorized or failed request");
                    return;
                }
                let dataBack = await res.json();
                setCamps((oldCamps) => {
                    if (!Array.isArray(dataBack) || dataBack.length === 0) return oldCamps;
                    const newCamps = dataBack.filter((camp) => !oldCamps.some((oldCamp) => oldCamp._id.toString() === camp._id.toString()));
                    return [...oldCamps, ...newCamps];
                });
            } catch (error) {
                console.error("Error fetching camps:", error);
            }
        }

        fetchCamps();

    }, [patientId, lastId]);

    useEffect(() => {

        const observer = new IntersectionObserver((params) => {
            // console.log(params)
            if (params[0].isIntersecting) {
                observer.unobserve(lastCamp);
                setLastId(camps[camps.length - 1]._id);
                // console.log("last id : ", lastId);
            }

        }, {
            threshold: 0.5
        });

        const lastCamp = document.querySelector(".camp-card:last-child");
        // console.log("last camp : ", lastCamp);

        if (!lastCamp) return;
        observer.observe(lastCamp);

        return () => {
            if (lastCamp) {
                observer.unobserve(lastCamp);
            }
            observer.disconnect();
        }
    }, [camps]);

    let handleRegister = async (id) => {
        console.log("Camp ID : ", id);
        setLoading(true);
        try {
            let data = await fetch(`${API_URL}/patient/camps/${id}/patient/${patientId}`, {
                method: "POST",
                credentials: "include"
            });
            let campDetails = await data.json();
            // console.log(campDetails.ok);
            if (campDetails && campDetails.ok === false) {
                // alert("Not Access For registration");
                setError("Not Access For registration again");
                return;
            }
            alert("Registered successfully!");
            // console.log(campDetails);
        } catch (error) {
            // console.error("Error registering for camp:", error);
            setError("Failed to register for camp. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="overflow-x-auto w-full p-2" style={{ perspective: '1200px' }}>
            <style>{`
              @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(20px) translateZ(-50px) rotateX(10deg); }
                to { opacity: 1; transform: translateY(0) translateZ(0) rotateX(0); }
              }
              .camp-card-animated {
                animation: slideUpFade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                opacity: 0;
              }
            `}</style>
            
            {error && (
                <div className="mb-4 p-4 bg-red-50/80 backdrop-blur-md text-red-700 border border-red-200 rounded-xl flex justify-between items-center shadow-sm">
                    <p className="font-medium flex items-center gap-2"><i className="fa-solid fa-circle-exclamation"></i> {error}</p>
                    <button onClick={() => setError(null)} className="text-red-400 hover:text-red-700 hover:bg-red-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            )}

            <PatientJoinMeet patientId={patientId} />

            <div id="cardList" className="mt-2 overflow-y-auto h-[450px] w-full space-y-4 pr-2">
                {camps.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400">
                        <i className="fa-solid fa-tent text-4xl mb-3 opacity-50"></i>
                        <p className="font-medium text-lg">No medical camps scheduled currently.</p>
                    </div>
                ) : (
                    camps.map((camp, i) => (
                        <div key={camp._id} 
                            className="camp-card camp-card-animated w-full px-6 py-6 flex flex-col md:flex-row justify-between items-center rounded-2xl bg-gradient-to-r from-sky-50 to-white border border-sky-100 hover:border-sky-300 hover:shadow-[0_10px_25px_rgba(14,165,233,0.15)] transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] gap-6 group relative overflow-hidden"
                            style={{ animationDelay: `${(i % 5) * 0.1}s` }}
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-sky-400 to-indigo-500"></div>

                            <div className="flex-1 min-w-0 ml-2">
                                <p className="font-black text-xl text-slate-800 drop-shadow-sm flex items-center gap-3 tracking-tight">
                                    <span className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 border border-slate-200 shadow-inner">
                                        <i className="fa-solid fa-hand-holding-medical"></i>
                                    </span>
                                    {(camp.CampType).toUpperCase()}
                                </p>
                                <div className="flex flex-wrap gap-3 mt-3 text-sm font-medium text-slate-500 md:ml-[3.25rem]">
                                    <p className="flex items-center gap-1.5 bg-sky-50 text-sky-600 px-3 py-1 rounded-full"><i className="fa-solid fa-location-dot text-sky-400"></i> {camp.villageName}</p>
                                    <p className="flex items-center gap-1.5 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full"><i className="fa-regular fa-calendar text-indigo-400"></i> {new Date(camp.Date).toLocaleDateString()}</p>
                                    <p className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full"><i className="fa-solid fa-user-doctor text-emerald-400"></i> Dr. {camp.AssignDoctor.name}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-3 shrink-0">
                                <CancleRegistration patientId={patientId} campId={camp._id} />
                                <button 
                                    onClick={() => handleRegister(camp._id)} 
                                    className="shrink-0 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl text-white font-bold shadow-[0_5px_15px_rgba(14,165,233,0.3)] hover:from-sky-600 hover:to-indigo-700 hover:shadow-[0_8px_20px_rgba(14,165,233,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                                >
                                    <i className="fa-solid fa-ticket"></i> Register
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}