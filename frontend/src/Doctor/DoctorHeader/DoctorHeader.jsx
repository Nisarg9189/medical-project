import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

export default function DoctorHeader() {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        // Clear any authentication tokens or user data here if needed
        let logout = await fetch(`${API_URL}/auth/logout`, {
            method: "GET",
            credentials: "include"
        });
        let data = await logout.json();
        if(data.ok) {
            alert("Logged out successfully");
            navigate("/");
        }
    }

    return (
        <div className='flex w-full h-[80px] px-8 items-center justify-between sticky top-0 z-50 bg-white/70 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b border-white/80 transition-all duration-300'>
            <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[10deg]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity drop-shadow-md"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">Doctor <span className="text-emerald-500">Portal</span></h2>
            </div>

            <button 
                className="group relative px-6 py-2.5 font-bold text-white rounded-xl overflow-hidden shadow-[0_5px_15px_rgba(244,63,94,0.3)] transform transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(244,63,94,0.4)] active:translate-y-0.5 bg-gradient-to-r from-rose-500 to-red-600"
                onClick={handleLogout}
            >
                <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full"></div>
                <span className="relative flex items-center gap-2">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </span>
            </button>
        </div>
    );
}