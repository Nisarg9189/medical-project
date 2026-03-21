import { useCallback, useState } from "react";
import { useSocket } from "../../SocketProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MeetingDetails({ doctorId }) {

    const socket = useSocket();

    const navigate = useNavigate();

    console.log("Socket in MeetingDetails:", socket);

    const [showJoinForm, setShowJoinForm] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        room: ""
    })

    const handleFormData = useCallback((e) => {
        e.preventDefault();
        
        socket.emit("room:join", {email: formData.email, room: formData.room, doctorId});
    }, [socket, formData, doctorId]);

    const handleJoinRoom = useCallback((data) => {
        const { email, room, doctorId } = data;
        console.log(email, room);

        navigate(`/room/${room}`);
    }, []);

    useEffect(() => {
        socket.on("room:join", handleJoinRoom);

        return () => {
            socket.off("room:join", handleJoinRoom); // cleanup
        }
    }, [socket, handleJoinRoom]);

    return (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
            <button 
                className="bg-sky-500 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-sky-600 transition-all shadow-[0_4px_10px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_15px_rgba(14,165,233,0.4)] flex items-center gap-2" 
                onClick={() => setShowJoinForm(!showJoinForm)}
            >
                <i className="fa-solid fa-video"></i> {showJoinForm ? "Cancel Meets" : "Join Online Meets"}
            </button>

            <form onSubmit={handleFormData} className={`transition-all duration-300 overflow-hidden flex gap-2 w-full md:w-auto ${showJoinForm ? "opacity-100 max-h-[100px] visible translate-y-0" : "opacity-0 max-h-0 invisible -translate-y-4"} `}>
                <div className="relative flex-1 md:w-48">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sky-200">
                        <i className="fa-regular fa-envelope"></i>
                    </div>
                    <input type="email" placeholder="patient email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 focus:ring-2 focus:ring-sky-300 focus:outline-none w-full py-2.5 pl-9 pr-3 text-white placeholder-[rgba(255,255,255,0.7)] rounded-xl transition-all shadow-inner"></input>
                </div>
                <div className="relative w-28 shrink-0">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-sky-200">
                        <i className="fa-solid fa-hashtag"></i>
                    </div>
                    <input type="number" placeholder="Room ID" value={formData.room} onChange={(e) => setFormData({...formData, room: e.target.value})} className="bg-sky-500 hover:bg-sky-600 focus:bg-sky-600 focus:ring-2 focus:ring-sky-300 focus:outline-none w-full py-2.5 pl-9 pr-3 text-white placeholder-[rgba(255,255,255,0.7)] rounded-xl transition-all shadow-inner"></input>
                </div>
                <button type="submit" className="bg-emerald-500 text-white shrink-0 px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-[0_4px_10px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_15px_rgba(16,185,129,0.4)] flex items-center gap-2">
                    <i className="fa-solid fa-right-to-bracket"></i> Join
                </button>
            </form>
        </div>
    );
}