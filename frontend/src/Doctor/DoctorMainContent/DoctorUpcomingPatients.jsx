import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DoctorUpcomingPatients({doctorId}) {
    const navigate = useNavigate();
    let [patients, setPatients] = useState([]);

    useEffect(() => {
        //fetch patients data from backend
        const fetchPatients = async () => {
            try {
                let response = await fetch(`https://backend-lugs.onrender.com/doctors/${doctorId}/patients`, {
                    method: "GET",
                    credentials: "include"
                });
                let data = await response.json();
                if(data.ok && !data.ok) {
                    alert("Unauthorized Access");
                    return;
                }
                // console.log("Patients Data:", data);
                setPatients(data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }
        fetchPatients();
    }, []);
    return (
        <>
            <div className="overflow-x-auto" id="cardList">
            <div id="cardList" className="mt-5 overflow-y-auto bg-slate-50 rounded-lg h-[400px] px-5 min-w-fit w-full">
                {/* <div className="sticky top-0 bg-white h-fit mb-5 border-b border-gray-300 pb-3 min-w-[500px]">
                <p className="text-xl"><i className="fa-regular fa-calendar"></i>Today's Patients</p>
                <p className="text-sm">Manage patient appointments and add diagnosis</p>
                </div> */}

                {/* <div className="w-[950px] px-5 py-5 flex justify-between rounded-lg bg-slate-100 mt-5 overflow-x-auto border-s-2 border-green-500">
                    <div className="shrink-0 overflow-x-auto">
                        <p>General Checkup Camp</p>
                        <p>Village: Rampur | Date: March 15, 2025</p>
                        <p>Doctor: Dr. Sharma | Registered: 24 patients</p>
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <form>
                            <button onClick={() => navigate("/add-diagnosis")}  className="shrink-0 bg-white px-2 py-2 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:text-white">Add Diagnosis</button>
                        </form>
                        <Page />
                        <form>
                            <button className="shrink-0 px-2 py-2 bg-sky-500 rounded-lg text-white">View Details</button>
                        </form>
                    </div>
                </div> */}
                
                {patients.map((appointment) => (
                <div id="cardList" key={appointment._id} className="min-w-fit w-full px-5 py-5 flex justify-between items-center rounded-lg 
                   bg-white mt-5 border-s-4 border-green-500 shadow-md overflow-x-auto">
                    <div className="shrink-0 overflow-x-auto">
                        <p>Patient Name: {appointment.patientId.name}</p>
                        <p>Camp: {appointment.campId.CampType} | Village: {appointment.campId.villageName}</p>
                        {/* <p>Age: {appointment.Age} | Gender: {appointment.Gender}</p> */}
                    </div>

                    <div className="flex items-center justify-center gap-5">
                        <button onClick={() => navigate(`/addDiagnosis/${appointment._id}`)}  className="shrink-0 px-2 py-2 rounded-lg hover:bg-green-500 transition-all duration-300 hover:text-white bg-sky-500">Add Diagnosis</button>
                    </div>
                </div>
            ))}
            </div>
            </div>
        </>
    );
}