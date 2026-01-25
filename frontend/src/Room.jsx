import { useEffect, useState, useRef } from "react";
import { useSocket } from "./SocketProvider";
import { useCallback } from "react";
import ReactPlayer from "react-player";
import peer from "./services/peer";

export default function Room() {

    const socket = useSocket();

    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState(null);
    const myVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const [remoteStream, setRemoteStream] = useState(null);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const offer = await peer.getOffer();
        socket.emit("call:user", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    useEffect(() => {
        if (myVideoRef.current && myStream) {
            myVideoRef.current.srcObject = myStream;
        }
    }, [myStream]);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    const handleUserJoined = ({ email, id }) => {
        console.log("User joined the room:", { email, id });
        setRemoteSocketId(id);
    };

    const handleIncomingCall = useCallback(async ({ from, offer }) => {
        console.log("Incoming call from:", from, offer);
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
    }, [socket]);

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(({ from, ans }) => {
        peer.setLocalDescription(ans);
        console.log("Call accepted by:", from);
        sendStreams();
    }, [sendStreams]);

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId]);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);

        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        }
    }, [socket, handleNegoNeeded]);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("remoteStream : ", remoteStream);
            setRemoteStream(remoteStream[0]);
        })
    }, [socket, remoteStream]);

    const handleNegoIncoming = useCallback(async ({ from, offer }) => {
        const ans = await peer.getAnswer(offer);
        socket.emit("peer:nego:done", { to: from, ans });
    }, [socket]);

    const handleNegoFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incoming:call", handleIncomingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoIncoming);
        socket.on("peer:nego:final", handleNegoFinal);

        return () => {
            socket.off("user:joined", handleUserJoined); // cleanup
            socket.off("incoming:call", handleIncomingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoIncoming);
            socket.off("peer:nego:final", handleNegoFinal);
        }

    }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted, handleNegoIncoming, handleNegoFinal]);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-6">

            {/* Header */}
            <div className="bg-gray-800 w-full max-w-5xl rounded-xl shadow-lg p-6">

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">Room</h1>

                    <span
                        className={`px-4 py-1 rounded-full text-sm font-medium 
        ${remoteSocketId ? "bg-green-500" : "bg-red-500"}`}
                    >
                        {remoteSocketId ? "Connected" : "Not Connected"}
                    </span>
                </div>

                {/* Call Button */}
                {remoteSocketId && (
                    <div className="flex justify-center mb-6">
                        <button
                            onClick={handleCallUser}
                            className="bg-green-500 hover:bg-green-600 transition px-6 py-2 rounded-lg font-medium shadow-md"
                        >
                            📞 Call User
                        </button>
                    </div>
                )}

                {/* Video Section */}
                <div className="h-[60vh] grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* My Video */}
                    {myStream && (
                        <div className="relative bg-black rounded-xl overflow-hidden">

                            <p className="absolute top-2 left-2 z-10 
                    bg-black/60 px-2 py-1 text-sm rounded">
                                You
                            </p>

                            <video
                                ref={myVideoRef}
                                autoPlay
                                muted
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Remote Video */}
                    {remoteStream && (
                        <div className="relative bg-black rounded-xl overflow-hidden">

                            <p className="absolute top-2 left-2 z-10 
                    bg-black/60 px-2 py-1 text-sm rounded">
                                Remote User
                            </p>

                            <video
                                ref={remoteVideoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                </div>


            </div>
        </div>



    );
}