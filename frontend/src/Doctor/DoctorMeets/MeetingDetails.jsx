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
        <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-2 py-2 rounded-lg" onClick={() => setShowJoinForm(!showJoinForm)}>Join Online Meets</button>

            <form onSubmit={handleFormData} className={showJoinForm ? "flex gap-2" : "hidden"}>
                <input type="email" placeholder="enter email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="bg-blue-500 h-fit w-fit px-2 py-2 text-white rounded-lg"></input>
                <input type="number" placeholder="enter room" value={formData.room} onChange={(e) => setFormData({...formData, room: e.target.value})} className="bg-blue-500 h-fit w-fit px-2 py-2 text-white rounded-lg"></input>
                <button type="submit" className="bg-green-600 text-white h-fit w-fit px-2 py-2 rounded-lg">Join</button>
            </form>
        </div>
    );
}