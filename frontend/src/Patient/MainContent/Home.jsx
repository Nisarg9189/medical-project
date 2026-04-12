import PatientHeader from "../Header/PatientHeader";
import PatientsUpcomingCamps from "./PatientsUpcomingCamps";
import PatientAppointments from "./PatientAppointments";
import ManageSchedule from "./ManageSchedule";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLoading } from "../../LoadingContext";

const API_URL = import.meta.env.VITE_API;

export default function MainContent() {
    const { setLoading } = useLoading();
    const { patientId } = useParams();
    // console.log("Patient ID in Home:", patientId);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const location = useLocation();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (location.state?.bookingSuccess) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    const handleAskAI = async (e) => {
        e.preventDefault();

        if (!question.trim()) return;

        setAnswer("Thinking...");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/ask`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId,
                    question
                }),
            });

            const data = await res.json();
            setAnswer(data.answer);
            setQuestion("");
        } catch (error) {
            setAnswer("Unable to fetch response. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="min-h-[calc(100vh-80px)] w-full relative overflow-x-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 font-sans pb-10">
            {/* Ambient Background Animations */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] mix-blend-multiply animate-[blobBounce_15s_infinite_alternate]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[120px] mix-blend-multiply animate-[blobBounce_18s_infinite_alternate_reverse]"></div>
                <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[90px] mix-blend-multiply animate-[blobBounce_20s_infinite_alternate]"></div>
            </div>

            <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-8 sm:px-10 sm:py-12">
                {showSuccess && (
                     <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 animate-[slideDownFade_0.4s_ease-out]">
                         <span className="font-bold">Appointment booked successfully!</span>
                         <button onClick={() => setShowSuccess(false)} className="text-white hover:text-emerald-200 transition">✕</button>
                     </div>
                )}
                
                <div className="mb-10 animate-[slideDownFade_0.8s_ease-out_forwards]">
                    <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                        Welcome, <span className="text-indigo-600">Patient</span>
                    </h1>
                    <p className="text-lg text-slate-500 font-medium mt-2 flex items-center gap-2">
                        <i className="fa-solid fa-notes-medical text-sky-500"></i> Access your health records and book appointments seamlessly.
                    </p>
                </div>

                {/* AI Assistant Card */}
                <div className="animate-[slideRightFade_0.8s_ease-out_forwards_0.2s] opacity-0 mb-10" style={{ animationFillMode: 'forwards' }}>
                    <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-8 transform transition-transform duration-500 hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)]">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <i className="fa-solid fa-robot text-2xl"></i>
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">AI Health Assistant</h2>
                        </div>
                        <form onSubmit={handleAskAI} className="flex gap-4">
                            <div className="relative flex-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Ask about symptoms, medicines, or precautions..."
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-medium rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 focus:bg-white transition-all shadow-inner placeholder:font-normal"
                                />
                            </div>
                            <button
                                type="submit"
                                className="shrink-0 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl text-white font-bold shadow-[0_5px_15px_rgba(79,70,229,0.3)] hover:from-indigo-700 hover:to-purple-800 hover:shadow-[0_8px_20px_rgba(79,70,229,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                            >
                                <i className="fa-solid fa-sparkles"></i> Ask
                            </button>
                        </form>
                        {answer && (
                            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 text-slate-700 shadow-inner flex gap-4 items-start animate-[slideUpFade_0.4s_ease-out]">
                                <div className="shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mt-0.5">
                                    <i className="fa-solid fa-robot"></i>
                                </div>
                                <div>
                                    <p className="font-bold text-indigo-900 mb-1">AI Response</p>
                                    <p className="leading-relaxed font-medium">{answer}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Action Grid */}
                <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
                    {/* Left: Manage Schedule */}
                    <div className="w-full xl:w-2/5 animate-[slideUpFade_0.8s_ease-out_forwards_0.4s] opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-8">
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3 mb-8 pb-4 border-b border-slate-200/60">
                                <span className="bg-sky-100 text-sky-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                                    <i className="fa-solid fa-calendar-check"></i>
                                </span>
                                Manage Appointments
                            </h2>
                            <ManageSchedule patientId={patientId} />
                        </div>
                        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-8 mt-8">
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3 mb-4 pb-4 border-b border-slate-200/60">
                                <span className="bg-teal-100 text-teal-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                                    <i className="fa-solid fa-list-check"></i>
                                </span>
                                My Registered Appointments
                            </h2>
                            <PatientAppointments patientId={patientId} />
                        </div>
                    </div>

                    {/* Right: Upcoming Camps */}
                    <div className="w-full xl:w-3/5 animate-[slideUpFade_0.8s_ease-out_forwards_0.6s] opacity-0" style={{ animationFillMode: 'forwards' }}>
                        <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-8">
                            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3 mb-4 pb-4 border-b border-slate-200/60">
                                <span className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
                                    <i className="fa-solid fa-tent"></i>
                                </span>
                                Upcoming Medical Camps
                            </h2>
                            <PatientsUpcomingCamps patientId={patientId} />
                        </div>
                    </div>
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