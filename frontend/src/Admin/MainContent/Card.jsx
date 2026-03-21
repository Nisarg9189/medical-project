import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API;

export default function Card({ adminId }) {
    let [cardData, setCardData] = useState({
        totalCamps: 0,
        activeDoctors: 0,
        villagesCovered: 0
    });

    useEffect(() => {
        //fetch card data from backend
        try {
            const fetchCardData = async () => {
                let response = await fetch(`${API_URL}/admin/${adminId}/card-details`, {
                    method: "GET",
                    credentials: "include"
                });
                let data = await response.json();
                // console.log(data);
                if (!data.ok) {
                    alert("Unauthorized Access");
                    return;
                }
                // console.log(data);
                setCardData(data);
            }
            fetchCardData();
        } catch (error) {
            console.log(error);
        }
    }, [adminId])
    return (
        <div id="cardList" className="mt-8 flex gap-8 items-start w-full overflow-x-auto pb-12 pt-4 px-4" style={{ perspective: '1200px' }}>
            {/* Camps Card */}
            <div className="relative px-6 py-6 bg-gradient-to-br from-white to-sky-50/80 rounded-3xl h-44 w-64 shrink-0 border border-white/60 shadow-[0_10px_30px_rgba(14,165,233,0.12)] transform transition-all duration-500 hover:-translate-y-3 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(20px)] hover:shadow-[0_25px_50px_rgba(14,165,233,0.25)] group overflow-hidden">
                <div className="absolute -top-4 -right-4 bg-sky-500/10 w-24 h-24 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute top-4 right-4 p-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:scale-110">
                    <i className="fa-solid fa-hospital text-5xl text-sky-600 drop-shadow-md"></i>
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest relative z-10">Total Camps</p>
                <p className="text-5xl font-black text-sky-600 my-3 drop-shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-105 origin-left">{cardData.totalCamps}</p>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-100/60 inline-block px-3 py-1.5 rounded-lg relative z-10">This month</p>
            </div>

            {/* Doctors Card */}
            <div className="relative px-6 py-6 bg-gradient-to-br from-white to-emerald-50/80 rounded-3xl h-44 w-64 shrink-0 border border-white/60 shadow-[0_10px_30px_rgba(16,185,129,0.12)] transform transition-all duration-500 hover:-translate-y-3 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(20px)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.25)] group overflow-hidden">
                <div className="absolute -top-4 -right-4 bg-emerald-500/10 w-24 h-24 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute top-4 right-4 p-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:scale-110">
                    <i className="fa-solid fa-user-doctor text-5xl text-emerald-600 drop-shadow-md"></i>
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest relative z-10">Active Doctors</p>
                <p className="text-5xl font-black text-emerald-600 my-3 drop-shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-105 origin-left">{cardData.activeDoctors}</p>
                <p className="text-xs font-bold text-emerald-600 bg-emerald-100/60 inline-block px-3 py-1.5 rounded-lg relative z-10">Available</p>
            </div>

            {/* Villages Card */}
            <div className="relative px-6 py-6 bg-gradient-to-br from-white to-indigo-50/80 rounded-3xl h-44 w-64 shrink-0 border border-white/60 shadow-[0_10px_30px_rgba(99,102,241,0.12)] transform transition-all duration-500 hover:-translate-y-3 hover:[transform:rotateX(4deg)_rotateY(-4deg)_translateZ(20px)] hover:shadow-[0_25px_50px_rgba(99,102,241,0.25)] group overflow-hidden">
                <div className="absolute -top-4 -right-4 bg-indigo-500/10 w-24 h-24 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute top-4 right-4 p-2 opacity-20 group-hover:opacity-40 transition-opacity duration-500 transform group-hover:scale-110">
                    <i className="fa-solid fa-house-chimney-medical text-5xl text-indigo-600 drop-shadow-md"></i>
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest relative z-10">Villages Covered</p>
                <p className="text-5xl font-black text-indigo-600 my-3 drop-shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-105 origin-left">{cardData.villagesCovered}</p>
                <p className="text-xs font-bold text-indigo-600 bg-indigo-100/60 inline-block px-3 py-1.5 rounded-lg relative z-10">This year</p>
            </div>
        </div>
    );
}