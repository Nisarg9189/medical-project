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
        <div className='flex w-full h-2/3 px-10 py-5 items-center justify-between bg-white container mx-auto shadow-md sticky top-0 z-50'>
            <div className="flex w-2/3 h-2/3 gap-2">
                <div className="w-[25px] h-[20px] mt-1 text-sky-500 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path><path d="M10 6h4"></path><path d="M10 10h4"></path><path d="M10 14h4"></path><path d="M10 18h4"></path></svg>
                </div>
                <div>
                    <h2 className="w-full text-2xl font-bold text-[#334155]">Admin Portal - Medical Service Organization</h2>
                </div>
            </div>

            <button className="h-full text-md border px-3 py-2 rounded hover:bg-sky-500 transition-all duration-300 hover:text-white" onClick={handleLogout}>Logout</button>
        </div>
    );
}