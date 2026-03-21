import { useState } from "react";
import Card from "./Card";
import CreateForm from "./CreateForm";
import RightBoard from "./RightBoard";
import UpcomingCamps from "./UpcomingCamps";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function MainContent() {
    const { adminId } = useParams();
    // console.log(adminId);
    return (
        <>

            <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50 font-sans">
                {/* Ambient Background Animations */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] mix-blend-multiply animate-[blobBounce_15s_infinite_alternate]"></div>
                    <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px] mix-blend-multiply animate-[blobBounce_18s_infinite_alternate_reverse]"></div>
                    <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-indigo-200/30 rounded-full blur-[90px] mix-blend-multiply animate-[blobBounce_20s_infinite_alternate]"></div>
                </div>

                <div className="relative z-10 max-w-[1600px] w-full mx-auto px-4 py-8 sm:px-8 sm:py-12">
                    {/* Header Section */}
                    <div className="mb-12 animate-[slideDownFade_0.8s_ease-out_forwards]">
                        <div className="inline-flex items-center gap-4 mb-2">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 text-white flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110 hover:rotate-6">
                                <i className="fa-solid fa-hospital-user text-3xl"></i>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                                Admin <span className="text-sky-600">Command Center</span>
                            </h1>
                        </div>
                        <p className="text-lg text-slate-500 font-medium ml-[4.5rem] max-w-2xl">
                            Monitor health metrics, coordinate medical deployments, and oversee system operations in real-time.
                        </p>
                    </div>

                    {/* Main Grid Layout */}
                    <div className="flex flex-col xl:flex-row gap-8 xl:gap-12">
                        
                        {/* Left & Center Content Area */}
                        <div className="flex-1 flex flex-col gap-10 overflow-hidden">
                            {/* Metrics Row */}
                            <section className="animate-[slideRightFade_0.8s_ease-out_forwards_0.2s] opacity-0" style={{ animationFillMode: 'forwards' }}>
                                <div className="flex items-center justify-between mb-2 px-2">
                                    <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2 drop-shadow-sm">
                                        <i className="fa-solid fa-chart-pie text-sky-500"></i> Platform Overview
                                    </h2>
                                </div>
                                <Card adminId={adminId} />
                            </section>

                            {/* Actions Row */}
                            <section className="animate-[slideRightFade_0.8s_ease-out_forwards_0.4s] opacity-0" style={{ animationFillMode: 'forwards' }}>
                                <div className="flex items-center justify-between mb-2 px-2">
                                    <h2 className="text-xl font-bold text-slate-700 flex items-center gap-2 drop-shadow-sm">
                                        <i className="fa-solid fa-bolt text-amber-500"></i> Quick Actions
                                    </h2>
                                </div>
                                <CreateForm adminId={adminId} />
                            </section>

                            {/* Upcoming Camps Full Width */}
                            <section className="animate-[slideUpFade_0.8s_ease-out_forwards_0.6s] opacity-0 w-full" style={{ animationFillMode: 'forwards' }}>
                                <UpcomingCamps adminId={adminId} />
                            </section>
                        </div>

                        {/* Right Sidebar - News Feed */}
                        <div className="w-full xl:w-[450px] shrink-0 animate-[slideLeftFade_0.8s_ease-out_forwards_0.8s] opacity-0" style={{ animationFillMode: 'forwards' }}>
                            <div className="sticky top-28">
                                <RightBoard />
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
                  @keyframes slideLeftFade {
                    from { opacity: 0; transform: translateX(40px); }
                    to { opacity: 1; transform: translateX(0); }
                  }
                  @keyframes slideUpFade {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
            </div>        </>
    );
}