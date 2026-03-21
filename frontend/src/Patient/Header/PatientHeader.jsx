import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

export default function PatientHeader() {
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-sky-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-10deg]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart drop-shadow-md"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">Village Medical <span className="text-sky-500">Care</span></h2>
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