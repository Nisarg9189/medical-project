import { useState, useEffect } from "react";
import { useLoading } from "../../LoadingContext";
import { useContext } from "react";
import { ErrorContext } from "../../ErrorContext";
import CancleRegistration from "./CancleRegistration";

const API_URL = import.meta.env.VITE_API;

export default function PatientsUpcomingCamps({ patientId }) {
    const { setLoading } = useLoading();
    let [camps, setCamps] = useState([]);

    const { error, setError } = useContext(ErrorContext);

    useEffect(() => {
        let fetchCamps = async () => {
            let res = await fetch(`${API_URL}/utils/camps`, {
                method: "GET",
                credentials: "include"
            });
            let dataBack = await res.json();
            // console.log(dataBack);
            setCamps(dataBack);
        }

        fetchCamps();
    }, [patientId]);

    let handleRegister = async (id) => {
        console.log("Camp ID : ", id);
        setLoading(true);
        try {
            let data = await fetch(`${API_URL}/patient/camps/${id}/patient/${patientId}`, {
                method: "POST",
                credentials: "include"
            });
            let campDetails = await data.json();
            // console.log(campDetails.ok);
            if (campDetails && campDetails.ok === false) {
                // alert("Not Access For registration");
                setError("Not Access For registration again");
                return;
            }
            alert("Registered successfully!");
            // console.log(campDetails);
        } catch (error) {
            // console.error("Error registering for camp:", error);
            setError("Failed to register for camp. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="overflow-x-auto" id="cardList">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded flex justify-between items-center">
                        <p>{error}</p>
                        <button onClick={() => setError(null)}>X</button>
                    </div>
                )}
                <div id="cardList" className="mt-5 overflow-y-auto bg-slate-50 rounded-lg h-[400px] px-5 min-w-fit w-full">
                    {/* <div className="sticky top-0 bg-white h-fit mb-5 border-b border-gray-300 pb-3 min-w-[500px]">
                <p className="text-xl"><i className="fa-regular fa-calendar"></i>Recent Medical Camps</p>
                <p className="text-sm">See Camps</p>
                </div> */}

                    {/* <div className="w-[800px] px-5 py-5 flex justify-between rounded-lg bg-slate-100 mt-5 overflow-x-auto border-s-2 border-green-500">
                    <div className="shrink-0 overflow-x-auto">
                        <p>General Checkup Camp</p>
                        <p>Village: Rampur | Date: March 15, 2025</p>
                        <p>Doctor: Dr. Sharma | Registered: 24 patients</p>
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <button className="shrink-0 px-2 py-2 bg-sky-500 rounded-lg text-white">Register</button>
                    </div>
                </div> */}

                    {camps.map((camp) => (
                        <div key={camp._id} className="min-w-fit w-full px-5 py-5 flex justify-between items-center rounded-lg 
                   bg-white mt-5 border-s-4 border-green-500 shadow-md">
                            <div>
                                <p className="text-sm"><strong>{(camp.CampType).toUpperCase()}</strong></p>
                                <p>Village: {camp.villageName} | Date: {new Date(camp.Date).toLocaleDateString()}</p>
                                <p>Doctor: {camp.AssignDoctor.name}</p>
                            </div>

                            <div className="flex items-center justify-center gap-5">
                                < CancleRegistration patientId={patientId} campId={camp._id} />
                                <button onClick={() => handleRegister(camp._id)} className="shrink-0 px-2 py-2 bg-sky-500 rounded-lg text-white">Register</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}