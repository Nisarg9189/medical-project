import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API;

export default function Header() {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        // Clear any authentication tokens or user data here if needed
        let logout = await fetch(`${API_URL}/auth/logout`, {
            method: "GET",
            credentials: "include"
        });
        let data = await logout.json();
        if(data.ok) {
            // alert("Logged out successfully");
            navigate("/", {
                state: { message: "Logged out successfully"}
            });
        }
    }

    return (
        <div className='flex w-full px-10 py-5 items-center justify-between bg-white/70 backdrop-blur-2xl shadow-[0_10px_30px_rgb(0,0,0,0.05)] sticky top-0 z-50 border-b border-white/60 transition-all duration-300'>
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 text-sky-500 shrink-0 drop-shadow-lg animate-[pulse_4s_ease-in-out_infinite]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
                </div>
                <div>
                    <h2 className="text-2xl font-extrabold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">
                        Admin Portal <span className="text-slate-400 font-medium">|</span> Medical Service
                    </h2>
                </div>
            </div>

            <button 
                className="px-6 py-2.5 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-bold rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] transform hover:-translate-y-1 transition-all duration-300 active:translate-y-0" 
                onClick={handleLogout}
            >
                Secure Logout
            </button>
        </div>
    );
}