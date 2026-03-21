import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreateForm({adminId}) {
    const navigate = useNavigate();
    return (
        <>
            <div id="cardList" className="mt-4 flex gap-8 items-center justify-start w-full overflow-x-auto pb-12 pt-4 px-4" style={{ perspective: '1200px' }}>
                {/* Create Camp Action Card */}
                <div 
                    className="relative group px-10 py-10 bg-gradient-to-br from-white to-sky-50/90 rounded-[2rem] w-[460px] h-[300px] shrink-0 border border-white/80 shadow-[0_15px_40px_rgba(14,165,233,0.15)] transform transition-all duration-500 hover:-translate-y-4 hover:[transform:rotateX(3deg)_rotateY(-3deg)_translateZ(30px)] hover:shadow-[0_30px_60px_rgba(14,165,233,0.3)] overflow-hidden cursor-pointer" 
                    onClick={() => navigate(`/${adminId}/create-camp`)}
                >
                    <div className="absolute -right-12 -top-12 bg-sky-500/10 w-48 h-48 rounded-full blur-2xl group-hover:scale-[1.8] transition-transform duration-700 ease-in-out"></div>
                    
                    {/* 3D Icon Container */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-100 to-blue-50 text-sky-600 mb-8 shadow-inner border border-white group-hover:[transform:rotateY(180deg)] transition-transform duration-700 ease-in-out [transform-style:preserve-3d]">
                        <i className="fa-solid fa-suitcase-medical text-3xl [transform:translateZ(20px)] drop-shadow-md"></i>
                    </div>
                    
                    <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm">Create Medical Camp</h3>
                    <p className="text-slate-500 mt-3 font-medium text-lg leading-snug">Deploy a new health camp in a target village</p>

                    <div className="absolute bottom-10 right-10 text-sky-500 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        <div className="bg-sky-100 p-3 rounded-full shadow-md">
                            <i className="fa-solid fa-arrow-right text-xl [transform:translateZ(10px)]"></i>
                        </div>
                    </div>
                </div>

                {/* Manage Doctors Action Card */}
                <div 
                    className="relative group px-10 py-10 bg-gradient-to-br from-white to-emerald-50/90 rounded-[2rem] w-[460px] h-[300px] shrink-0 border border-white/80 shadow-[0_15px_40px_rgba(16,185,129,0.15)] transform transition-all duration-500 hover:-translate-y-4 hover:[transform:rotateX(3deg)_rotateY(-3deg)_translateZ(30px)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.3)] overflow-hidden cursor-pointer" 
                    onClick={() => navigate(`/${adminId}/create-doctor`)}
                >
                    <div className="absolute -right-12 -top-12 bg-emerald-500/10 w-48 h-48 rounded-full blur-2xl group-hover:scale-[1.8] transition-transform duration-700 ease-in-out"></div>
                    
                    {/* 3D Icon Container */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-600 mb-8 shadow-inner border border-white group-hover:[transform:rotateY(180deg)] transition-transform duration-700 ease-in-out [transform-style:preserve-3d]">
                        <i className="fa-solid fa-user-doctor text-3xl [transform:translateZ(20px)] drop-shadow-md"></i>
                    </div>
                    
                    <h3 className="text-3xl font-extrabold text-slate-800 tracking-tight drop-shadow-sm">Manage Doctors</h3>
                    <p className="text-slate-500 mt-3 font-medium text-lg leading-snug">Onboard and assign doctors to running camps</p>
                    
                    <div className="absolute bottom-10 right-10 text-emerald-500 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                        <div className="bg-emerald-100 p-3 rounded-full shadow-md">
                            <i className="fa-solid fa-arrow-right text-xl [transform:translateZ(10px)]"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}