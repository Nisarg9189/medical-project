import DoctorCard from "./DoctorCard";
import DoctorUpcomingPatients from "./DoctorUpcomingPatients";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MeetingDetails from "../DoctorMeets/MeetingDetails";

const API_URL = import.meta.env.VITE_API;

export default function DocotrMainContent() {
    const { doctorId } = useParams();
    // console.log("Doctor ID in Doctor Main Content:", doctorId);
    let [doctorDetails, setDoctorDetails] = useState(null);

    useEffect(() => {
        let fetchDoctorDetails = async () => {
            let res = await fetch(`${API_URL}/doctors/${doctorId}/details`, {
                method: "GET",
                credentials: "include"
            });
            let data = await res.json();
            if (data.ok && !data.ok) {
                alert("Unauthorized Access");
                return;
            }
            // console.log(data);
            setDoctorDetails(data);
        };
        fetchDoctorDetails();
    }, [doctorId]);

    return (
        <div className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 font-sans">
            {/* Ambient Background Animations */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px] mix-blend-multiply animate-[blobBounce_15s_infinite_alternate]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply animate-[blobBounce_18s_infinite_alternate_reverse]"></div>
                <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[90px] mix-blend-multiply animate-[blobBounce_20s_infinite_alternate]"></div>
            </div>

            <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-8 sm:px-10 sm:py-12">
                {/* Heading */}
                <div className="mb-10 animate-[slideDownFade_0.8s_ease-out_forwards]">
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                        Welcome, Dr. <span className="text-emerald-600">{doctorDetails ? doctorDetails.name : 'Loading...'}</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium mt-2 flex items-center gap-2">
                        <i className="fa-regular fa-calendar-check text-emerald-500"></i> Today's Schedule - {new Date().toLocaleDateString()}
                    </p>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col gap-10">
                    
                    {/* Doctor Profile Card / Metrics Row */}
                    <section className="animate-[slideRightFade_0.8s_ease-out_forwards_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
                         <div className="flex items-center justify-between mb-4 px-2">
                            <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2 drop-shadow-sm">
                                <i className="fa-solid fa-chart-line text-emerald-500"></i> Appointment Metrics
                            </h2>
                        </div>
                        <DoctorCard doctorId={doctorId} />
                    </section>

                    {/* Upcoming Patients Section */}
                    <section className="animate-[slideUpFade_0.8s_ease-out_forwards_0.4s] opacity-0 w-full" style={{ animationFillMode: 'forwards' }}>
                        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-8">
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3 mb-8 pb-4 border-b border-slate-200/60">
                                <span className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                                    <i className="fa-regular fa-calendar"></i>
                                </span>
                                Today's Patients
                            </h2>
                            <div className="flex flex-col xl:flex-row gap-8">
                                <div className="xl:w-1/3">
                                    <MeetingDetails doctorId={doctorId} />
                                </div>
                                <div className="xl:w-2/3">
                                    <DoctorUpcomingPatients doctorId={doctorId} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <style>{`
              @keyframes blobBounce {
                0% { transform: translateY(0) scale(1) rotate(0deg); }
                50% { transform: translateY(-30px) scale(1.05) rotate(5deg); }
                100% { transform: translateY(20px) scale(0.95) rotate(-5deg); }
              }
              @keyframes slideDownFade {
                from { opacity: 0; transform: translateY(-30px); }
                to { opacity: 1; transform: translateY(0); }
              }
              @keyframes slideRightFade {
                from { opacity: 0; transform: translateX(-40px); }
                to { opacity: 1; transform: translateX(0); }
              }
              @keyframes slideUpFade {
                from { opacity: 0; transform: translateY(40px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
        </div>
    );
}