import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API;

export default function UpcomingCamps({adminId}) {
    const [camps, setCamps] = useState([]);

    useEffect(() => {
        const getUpcomingCamps = async () => {
            try {
                let camp = await fetch(`${API_URL}/admin/${adminId}/camps`, {
                    method: "GET",
                    credentials: "include"
                });
                let res = await camp.json();
                console.log(res);
                if(res.ok && !res.ok) {
                    alert("Unauthorized Access");
                    setCamps([]);
                    return;
                }
                // console.log(res);
                setCamps(res);
            } catch (err) {
                console.error("Error fetching doctors:", err);
                setCamps([]);
            }
        };

        getUpcomingCamps();
    }, [adminId]); // runs only once

    const handleCancleCamp = async (campId) => {
        console.log("Cancle Camp ID : ", campId);
    }

    const handleEditCamp = async (campId) => {
        console.log("Edit Camp ID : ", campId);
    }
    
    return (
        <>
            <div className="overflow-x-auto">
                <div id="cardList" className="mt-5 overflow-y-auto bg-white rounded-lg h-[400px] px-5 w-full min-w-fit">
                    <div className="sticky top-0 bg-white h-fit mb-5 border-b border-gray-300 pb-3">
                    <p className="text-xl"><i className="fa-regular fa-calendar"></i>Upcoming Camps</p>
                    <p className="text-sm">Scheduled medical camps for this month</p>
                    </div>
                    {/* <div className="w-[800px] px-5 py-5 flex justify-between rounded-lg bg-slate-100 mt-5 overflow-x-auto">
                        <div className="shrink-0 overflow-x-auto">
                            <p>General Checkup Camp</p>
                            <p>Village: Rampur | Date: March 15, 2025</p>
                            <p>Doctor: Dr. Sharma | Registered: 24 patients</p>
                        </div>

                        <div className="flex items-center justify-center gap-5">
                            <form>
                                <button className="shrink-0 bg-white px-2 py-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:text-white">View Details</button>
                            </form>
                            <form>
                                <button className="shrink-0 px-2 py-2 bg-sky-500 rounded-lg text-white">Edit</button>
                            </form>
                        </div>
                    </div> */}

                    {camps.map((camp) => (
                        <div id="cardList"
                            key={camp._id}
                            className="min-w-fit w-full px-5 py-5 flex justify-between rounded-lg bg-slate-100 mt-5 overflow-x-auto gap-4"
                        >
                            {/* Left side */}
                            <div className="shrink-0 overflow-x-auto">
                                <p className="font-semibold">{camp.CampType}</p>
                                <p>
                                    Village: {camp.villageName} |
                                    Date: {new Date(camp.Date).toLocaleDateString()}
                                </p>
                                <p>
                                    Doctor: {camp.AssignDoctor?.name}
                                    {/* Registered: {camp.registeredCount || 0} patients */}
                                </p>
                            </div>

                            {/* Right side buttons */}
                            <div className="flex items-center justify-center gap-5">

                                <button
                                    className="shrink-0 bg-white px-2 py-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:text-white"
                                    onClick={() => handleCancleCamp(camp._id)}
                                >
                                    Cancle
                                </button>

                                <button
                                    className="shrink-0 px-2 py-2 bg-sky-500 rounded-lg text-white"
                                    onClick={() => handleEditCamp(camp._id)}
                                >
                                    Edit
                                </button>

                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>
    );
}