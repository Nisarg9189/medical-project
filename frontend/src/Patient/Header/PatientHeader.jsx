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
        <div className='flex w-full h-2/3 px-10 py-5 items-center justify-between container mx-auto bg-white shadow-md sticky top-0 z-50 border-b border-green-500'>
            <div className="flex w-2/3 h-2/3 gap-2">
                <div className="w-[25px] h-[20px] mt-1 shrink-0 text-[#0da2e7]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart h-6 w-6 text-primary"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </div>
                <div>
                    <h2 className="w-full text-2xl font-bold text-[#334155]">Village Medical Care</h2>
                </div>
            </div>

            <button className="h-full text-md border px-3 py-2 rounded hover:bg-red-500 transition-all duration-300 hover:text-white border-sky-500" onClick={handleLogout}>Logout</button>
        </div>
    );
}