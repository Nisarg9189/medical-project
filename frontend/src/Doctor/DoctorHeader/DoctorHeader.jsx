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
        <div className='flex w-full h-fit px-5 py-5 items-center justify-between container mx-auto border-b border-green-500 bg-white shadow-md sticky top-0 z-50'>
            <div className="flex w-2/3 h-2/3 gap-2">
                <div className="w-[25px] h-[20px] mt-1 text-green-500 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity h-6 w-6 text-secondary"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path></svg>
                </div>
                <div>
                    <h2 className="w-full text-2xl font-bold text-[#334155]">Doctor Portal</h2>
                </div>
            </div>

            <button className="h-full text-md border px-3 py-2 rounded hover:bg-red-500 transition-all duration-300 hover:text-white border-sky-500" onClick={handleLogout}>Logout</button>
        </div>
    );
}