import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API;

export default function UpcomingCamps({ adminId }) {
    const [camps, setCamps] = useState([]);
    const [lastCampId, setLastCampId] = useState(null);

    useEffect(() => {
        const getUpcomingCamps = async () => {
            try {
                let camp = await fetch(`${API_URL}/admin/${adminId}/camps?lastCampId=${lastCampId ? lastCampId : ""}`, {
                    method: "GET",
                    credentials: "include"
                });
                if (!camp.ok) {
                    console.log("Unauthorized or failed request");
                    setCamps([]);
                    return;
                }
                let res = await camp.json();
                setCamps((prevCamps) => {
                    if (!lastCampId) return res;

                    if (res.length === 0) return prevCamps;

                    const newCamps = res.filter((camp) => !prevCamps.some((prevCamp) => prevCamp._id === camp._id));

                    return [...prevCamps, ...newCamps];
                });

            } catch (err) {
                console.error("Error fetching camps:", err);
                setCamps([]);
            }
        };

        getUpcomingCamps();
    }, [adminId, lastCampId]); // runs only once

    useEffect(() => {
        const observer = new IntersectionObserver((params) => {
            // console.log(params);

            if (params[0].isIntersecting) {
                observer.unobserve(lastCamp);
                setLastCampId(camps[camps.length - 1]._id);
            }

        }, {
            threshold: 0.5
        });

        const lastCamp = document.querySelector(".camp-card:last-child");

        if (!lastCamp) return;

        // console.log(lastCamp);
        observer.observe(lastCamp);

        return () => {
            if (lastCampId) {
                observer.unobserve(lastCamp);
            }

            observer.disconnect();
        }

    }, [camps]);

    const handleCancleCamp = async (campId) => {
        console.log("Cancle Camp ID : ", campId);
    }

    const handleEditCamp = async (campId) => {
        console.log("Edit Camp ID : ", campId);
    }

    return (
        <>
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
            <div className="overflow-x-auto p-4" style={{ perspective: '1200px' }}>
                <div id="cardList" className="mt-4 overflow-y-auto bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] h-[550px] px-8 py-6 w-full min-w-fit border border-white/80">
                    <div className="bg-white/60 backdrop-blur-3xl h-50 mb-6 border-b border-slate-200/60 pb-4 z-10 px-4">
                        <p className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                            <span className="bg-sky-100 text-sky-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                                <i className="fa-regular fa-calendar-check"></i>
                            </span>
                            Upcoming Camps
                        </p>
                        <p className="text-sm font-medium text-slate-500 mt-2 ml-15">Scheduled medical camps for this month</p>
                    </div>

                    <div className="space-y-4 pb-4">
                        {camps.map((camp, i) => (
                            <div id="cardList"
                                key={camp._id}
                                className="camp-card camp-card-animated min-w-fit w-full px-6 py-6 flex justify-between rounded-2xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 hover:border-sky-200 hover:shadow-[0_10px_20px_rgba(14,165,233,0.15)] transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] gap-8 group"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                {/* Left side */}
                                <div className="shrink-0 overflow-x-auto">
                                    <p className="font-bold text-xl text-slate-800 drop-shadow-sm group-hover:text-sky-600 transition-colors">{camp.CampType}</p>
                                    <div className="flex gap-4 mt-2 text-sm font-medium text-slate-500">
                                        <p className="flex items-center gap-1.5"><i className="fa-solid fa-location-dot text-rose-400"></i> {camp.villageName}</p>
                                        <p className="flex items-center gap-1.5"><i className="fa-regular fa-calendar-days text-sky-400"></i> {new Date(camp.Date).toLocaleDateString()}</p>
                                    </div>
                                    <p className="mt-3 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-flex items-center gap-2">
                                        <i className="fa-solid fa-user-doctor"></i> {camp.AssignDoctor?.name || 'Unassigned'}
                                    </p>
                                </div>

                                {/* Right side buttons */}
                                <div className="flex items-center justify-center gap-4">
                                    <button
                                        className="shrink-0 bg-white border border-rose-200 text-rose-600 px-4 py-2.5 rounded-xl hover:bg-rose-500 hover:text-white hover:border-transparent hover:shadow-[0_5px_15px_rgba(244,63,94,0.3)] transform hover:-translate-y-0.5 transition-all duration-300 font-bold"
                                        onClick={() => handleCancleCamp(camp._id)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="shrink-0 px-6 py-2.5 bg-sky-500 rounded-xl text-white font-bold shadow-[0_5px_15px_rgba(14,165,233,0.3)] hover:bg-sky-600 hover:shadow-[0_8px_20px_rgba(14,165,233,0.4)] transform hover:-translate-y-0.5 transition-all duration-300"
                                        onClick={() => handleEditCamp(camp._id)}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}