import PatientHeader from "../Header/PatientHeader";
import PatientsUpcomingCamps from "./PatientsUpcomingCamps";
import ManageSchedule from "./ManageSchedule";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useLoading } from "../../LoadingContext";

export default function MainContent() {
    const { setLoading } = useLoading();
    const { patientId } = useParams();
    // console.log("Patient ID in Home:", patientId);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleAskAI = async (e) => {
        e.preventDefault();

        if (!question.trim()) return;

        setAnswer("Thinking...");
        setLoading(true);

        try {
            const res = await fetch("https://backend-lugs.onrender.com/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    patientId,
                    question
                }),
            });

            const data = await res.json();
            setAnswer(data.answer);
            setQuestion("");
        } catch (error) {
            setAnswer("Unable to fetch response. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    return (
        <>
            <div className="min-h-screen container mx-auto bg-gradient-to-br from-indigo-50 to-sky-200 rounded-md px-5 py-5 pb-10">
                <div className="rounded px-4 py-5 w-full">
                    <h1 className="text-3xl text-[#334155] font-semibold">Welcome, Patient</h1>
                    <p className="text-sm mb-5">Access your health records and book appointments</p>

                    {/* 👉 ADD AI HEALTH ASSISTANT HERE */}
                    <div className="flex-1 w-full bg-white shadow-md rounded-xl p-5 mb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-3">
                            🤖 Ask AI Health Assistant
                        </h2>

                        <form onSubmit={handleAskAI} className="flex gap-3 flex-wrap">
                            <input
                                type="text"
                                placeholder="Ask about symptoms, medicines, or precautions..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />

                            <button
                                type="submit"
                                className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Ask
                            </button>
                        </form>

                        {answer && (
                            <div className="mt-4 bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-sm text-gray-700">
                                <strong>AI Response:</strong>
                                <p className="mt-1">{answer}</p>
                            </div>
                        )}
                    </div>

                    {/* FLEX LAYOUT */}
                    <div className="flex flex-wrap gap-6 flex-col">

                        {/* Manage Schedule */}
                        <div className="flex-1 w-full bg-white shadow-md rounded-xl p-5">
                            <h2 className="text-xl font-semibold text-gray-700 mb-3">Manage Appointments</h2>
                            <ManageSchedule patientId={patientId} />
                        </div>

                        {/* Upcoming Camps */}
                        <div className="flex-1 w-full bg-white shadow-md rounded-xl p-5">
                            <h2 className="text-xl font-semibold text-gray-700 mb-3"><i className="fa-regular fa-calendar"></i> Upcoming Medical Camps</h2>
                            <PatientsUpcomingCamps patientId={patientId} />
                        </div>

                    </div>
                </div>
            </div>

        </>
    );
}