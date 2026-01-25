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

    const handleIncomingCall = useCallback( async ({ from, offer }) => {
        console.log("Incoming call from:", from, offer);
        setRemoteSocketId(from);
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setMyStream(stream);
        const ans = await peer.getAnswer(offer);
        socket.emit("call:accepted", { to: from, ans });
    }, [socket]);

    const sendStreams = useCallback(() => {
        for(const track of myStream.getTracks()) {
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
        const ans =  await peer.getAnswer(offer);
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
        <div>
            <p>Room Component</p>
            <p>{remoteSocketId ? "Connected" : "Not Connected"}</p>
            {remoteSocketId && <button className="bg-green-400 px-2 py-2 rounded-sm" onClick={handleCallUser}>CALL</button>}
            {myStream && (
                <video
                    ref={myVideoRef}
                    autoPlay
                    muted
                    width="500"
                    height="500"
                />
            )}
            {remoteStream && (
                <video
                    ref={remoteVideoRef}
                    autoPlay
                    playsInline
                    width="500"
                    height="500"
                />
            )}
        </div>
    );
}