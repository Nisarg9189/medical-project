// import DoctorCard from "./DoctorCard";
// import DoctorUpcomingPatients from "./DoctorUpcomingPatients";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import MeetingDetails from "../DoctorMeets/MeetingDetails";

// const API_URL = import.meta.env.VITE_API;

// export default function DocotrMainContent() {
//     const { doctorId } = useParams();
//     // console.log("Doctor ID in Doctor Main Content:", doctorId);
//     let [doctorDetails, setDoctorDetails] = useState(null);

//     useEffect(() => {
//         let fetchDoctorDetails = async () => {
//             let res = await fetch(`${API_URL}/doctors/${doctorId}/details`, {
//                 method: "GET",
//                 credentials: "include"
//             });
//             let data = await res.json();
//             if (data.ok && !data.ok) {
//                 alert("Unauthorized Access");
//                 return;
//             }
//             // console.log(data);
//             setDoctorDetails(data);
//         };
//         fetchDoctorDetails();
//     }, [doctorId]);

//     return (
//         <div className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 font-sans">
//             {/* Ambient Background Animations */}
//             <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//                 <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px] mix-blend-multiply animate-[blobBounce_15s_infinite_alternate]"></div>
//                 <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply animate-[blobBounce_18s_infinite_alternate_reverse]"></div>
//                 <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[90px] mix-blend-multiply animate-[blobBounce_20s_infinite_alternate]"></div>
//             </div>

//             <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-8 sm:px-10 sm:py-12">
//                 {/* Heading */}
//                 <div className="mb-10 animate-[slideDownFade_0.8s_ease-out_forwards]">
//                     <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
//                         Welcome, Dr. <span className="text-emerald-600">{doctorDetails ? doctorDetails.name : 'Loading...'}</span>
//                     </h1>
//                     <p className="text-lg text-slate-500 font-medium mt-2 flex items-center gap-2">
//                         <i className="fa-regular fa-calendar-check text-emerald-500"></i> Today's Schedule - {new Date().toLocaleDateString()}
//                     </p>
//                 </div>

//                 {/* Main Content Layout */}
//                 <div className="flex flex-col gap-10">

//                     {/* Doctor Profile Card / Metrics Row */}
//                     <section className="animate-[slideRightFade_0.8s_ease-out_forwards_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
//                          <div className="flex items-center justify-between mb-4 px-2">
//                             <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2 drop-shadow-sm">
//                                 <i className="fa-solid fa-chart-line text-emerald-500"></i> Appointment Metrics
//                             </h2>
//                         </div>
//                         <DoctorCard doctorId={doctorId} />
//                     </section>

//                     {/* Upcoming Patients Section */}
//                     <section className="animate-[slideUpFade_0.8s_ease-out_forwards_0.4s] opacity-0 w-full" style={{ animationFillMode: 'forwards' }}>
//                         <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-8">
//                             <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3 mb-8 pb-4 border-b border-slate-200/60">
//                                 <span className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
//                                     <i className="fa-regular fa-calendar"></i>
//                                 </span>
//                                 Today's Patients
//                             </h2>
//                             <div className="flex flex-col xl:flex-row gap-8">
//                                 <div className="xl:w-1/3">
//                                     <MeetingDetails doctorId={doctorId} />
//                                 </div>
//                                 <div className="xl:w-2/3">
//                                     <DoctorUpcomingPatients doctorId={doctorId} />
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>

//             <style>{`
//               @keyframes blobBounce {
//                 0% { transform: translateY(0) scale(1) rotate(0deg); }
//                 50% { transform: translateY(-30px) scale(1.05) rotate(5deg); }
//                 100% { transform: translateY(20px) scale(0.95) rotate(-5deg); }
//               }
//               @keyframes slideDownFade {
//                 from { opacity: 0; transform: translateY(-30px); }
//                 to { opacity: 1; transform: translateY(0); }
//               }
//               @keyframes slideRightFade {
//                 from { opacity: 0; transform: translateX(-40px); }
//                 to { opacity: 1; transform: translateX(0); }
//               }
//               @keyframes slideUpFade {
//                 from { opacity: 0; transform: translateY(40px); }
//                 to { opacity: 1; transform: translateY(0); }
//               }
//             `}</style>
//         </div>
//     );
// }
// import DoctorCard from "./DoctorCard";
// import DoctorUpcomingPatients from "./DoctorUpcomingPatients";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import MeetingDetails from "../DoctorMeets/MeetingDetails";

// const API_URL = import.meta.env.VITE_API;

// export default function DocotrMainContent() {
//     const { doctorId } = useParams();
//     // console.log("Doctor ID in Doctor Main Content:", doctorId);
//     let [doctorDetails, setDoctorDetails] = useState(null);

//     useEffect(() => {
//         let fetchDoctorDetails = async () => {
//             let res = await fetch(`${API_URL}/doctors/${doctorId}/details`, {
//                 method: "GET",
//                 credentials: "include"
//             });
//             let data = await res.json();
//             if (data.ok && !data.ok) {
//                 alert("Unauthorized Access");
//                 return;
//             }
//             // console.log(data);
//             setDoctorDetails(data);
//         };
//         fetchDoctorDetails();
//     }, [doctorId]);

//     return (
//         <div className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 font-sans">
//             {/* Ambient Background Animations */}
//             <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//                 <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px] mix-blend-multiply animate-[blobBounce_15s_infinite_alternate]"></div>
//                 <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply animate-[blobBounce_18s_infinite_alternate_reverse]"></div>
//                 <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[90px] mix-blend-multiply animate-[blobBounce_20s_infinite_alternate]"></div>
//             </div>

//             <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-8 sm:px-10 sm:py-12">
//                 {/* Heading */}
//                 <div className="mb-10 animate-[slideDownFade_0.8s_ease-out_forwards]">
//                     <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
//                         Welcome, Dr. <span className="text-emerald-600">{doctorDetails ? doctorDetails.name : 'Loading...'}</span>
//                     </h1>
//                     <p className="text-lg text-slate-500 font-medium mt-2 flex items-center gap-2">
//                         <i className="fa-regular fa-calendar-check text-emerald-500"></i> Today's Schedule - {new Date().toLocaleDateString()}
//                     </p>
//                 </div>

//                 {/* Main Content Layout */}
//                 <div className="flex flex-col gap-10">

//                     {/* Doctor Profile Card / Metrics Row */}
//                     <section className="animate-[slideRightFade_0.8s_ease-out_forwards_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
//                          <div className="flex items-center justify-between mb-4 px-2">
//                             <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2 drop-shadow-sm">
//                                 <i className="fa-solid fa-chart-line text-emerald-500"></i> Appointment Metrics
//                             </h2>
//                         </div>
//                         <DoctorCard doctorId={doctorId} />
//                     </section>

//                     {/* Upcoming Patients Section */}
//                     <section className="animate-[slideUpFade_0.8s_ease-out_forwards_0.4s] opacity-0 w-full" style={{ animationFillMode: 'forwards' }}>
//                         <div className="bg-white/70 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-[2rem] border border-white/80 p-8">
//                             <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3 mb-8 pb-4 border-b border-slate-200/60">
//                                 <span className="bg-emerald-100 text-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-inner">
//                                     <i className="fa-regular fa-calendar"></i>
//                                 </span>
//                                 Today's Patients
//                             </h2>
//                             <div className="flex flex-col xl:flex-row gap-8">
//                                 <div className="xl:w-1/3">
//                                     <MeetingDetails doctorId={doctorId} />
//                                 </div>
//                                 <div className="xl:w-2/3">
//                                     <DoctorUpcomingPatients doctorId={doctorId} />
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             </div>

//             <style>{`
//               @keyframes blobBounce {
//                 0% { transform: translateY(0) scale(1) rotate(0deg); }
//                 50% { transform: translateY(-30px) scale(1.05) rotate(5deg); }
//                 100% { transform: translateY(20px) scale(0.95) rotate(-5deg); }
//               }
//               @keyframes slideDownFade {
//                 from { opacity: 0; transform: translateY(-30px); }
//                 to { opacity: 1; transform: translateY(0); }
//               }
//               @keyframes slideRightFade {
//                 from { opacity: 0; transform: translateX(-40px); }
//                 to { opacity: 1; transform: translateX(0); }
//               }
//               @keyframes slideUpFade {
//                 from { opacity: 0; transform: translateY(40px); }
//                 to { opacity: 1; transform: translateY(0); }
//               }
//             `}</style>
//         </div>
//     );
// }



import DoctorCard from "./DoctorCard";
import DoctorUpcomingPatients from "./DoctorUpcomingPatients";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MeetingDetails from "../DoctorMeets/MeetingDetails";

const API_URL = import.meta.env.VITE_API;

export default function DocotrMainContent() {
    const { doctorId } = useParams();
    let [doctorDetails, setDoctorDetails] = useState(null);
    let [downloading, setDownloading] = useState(false);

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
            setDoctorDetails(data);
        };
        fetchDoctorDetails();
    }, [doctorId]);

    // ── Download completed appointments as Excel ──────────────────────────────
    const handleDownloadExcel = async () => {
        try {
            setDownloading(true);
            const res = await fetch(`${API_URL}/doctors/${doctorId}/appointments/download`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                alert("Failed to download. Please try again.");
                return;
            }

            // Pull filename from Content-Disposition header if available
            const disposition = res.headers.get("Content-Disposition");
            let filename = "Completed_Appointments.xlsx";
            if (disposition) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match) filename = match[1];
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Download error:", err);
            alert("Something went wrong while downloading.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 font-sans">
            {/* Ambient Background Animations */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-[100px] mix-blend-multiply animate-[blobBounce_15s_infinite_alternate]"></div>
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-200/40 rounded-full blur-[120px] mix-blend-multiply animate-[blobBounce_18s_infinite_alternate_reverse]"></div>
                <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-[90px] mix-blend-multiply animate-[blobBounce_20s_infinite_alternate]"></div>
            </div>

            <div className="relative z-10 max-w-[1600px] w-full mx-auto px-6 py-8 sm:px-10 sm:py-12">
                {/* Heading + Download Button Row */}
                <div className="mb-10 animate-[slideDownFade_0.8s_ease-out_forwards] flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                            Welcome, Dr. <span className="text-emerald-600">{doctorDetails ? doctorDetails.name : 'Loading...'}</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-medium mt-2 flex items-center gap-2">
                            <i className="fa-regular fa-calendar-check text-emerald-500"></i> Today's Schedule — {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    {/* ── Excel Download Button ── */}
                    <button
                        onClick={handleDownloadExcel}
                        disabled={downloading}
                        className={`
                            group relative flex items-center gap-3 self-start
                            px-5 py-3 rounded-2xl font-semibold text-sm
                            shadow-[0_4px_20px_rgba(5,150,105,0.25)]
                            border border-emerald-300/60
                            transition-all duration-300
                            ${downloading
                                ? "bg-emerald-100 text-emerald-400 cursor-not-allowed"
                                : "bg-white/80 backdrop-blur-md text-emerald-700 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 hover:shadow-[0_6px_28px_rgba(5,150,105,0.40)] active:scale-95"
                            }
                        `}
                    >
                        {/* Shimmer layer on hover */}
                        <span className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
                        </span>

                        {downloading ? (
                            <>
                                <svg className="animate-spin w-5 h-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                <span>Preparing Excel…</span>
                            </>
                        ) : (
                            <>
                                {/* Sheet icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 13h8v1.5H8V13zm0 3h5v1.5H8V16zm0-6h2v1.5H8V10z" />
                                </svg>
                                <span>Download Completed</span>
                                {/* Download arrow */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 16l-6-6h4V4h4v6h4l-6 6zm-7 2h14v2H5v-2z" />
                                </svg>
                            </>
                        )}
                    </button>
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