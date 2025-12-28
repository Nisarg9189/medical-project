import { useState, useEffect } from "react";
export default function DoctorCard({ doctorId }) {
    let [patient, setPatient] = useState({
        pending: 0,
        completed: 0,
        totalPatients: 0
    });

    useEffect(() => {
        // Fetch patient data based on doctorId
        const fetchPatientsCount = async () => {
            let response = await fetch(`https://backend-lugs.onrender.com/doctors/${doctorId}/appointments`, {
                method: "GET",
                credentials: "include"
            });
            let data = await response.json();
            if(data.ok && !data.ok) {
                alert("Unauthorized Access");
                return;
            }
            // console.log(data);
            setPatient(data);
        }
        fetchPatientsCount();
    }, [doctorId]);
    return (
        <div id="cardList" className="mt-10 flex gap-5 items-start w-full overflow-x-auto container mx-auto">
            <div className="px-5 py-5 bg-slate-50 rounded-lg h-35 min-w-80 shrink-0 border-s-2 border-green-500">
                <p>Total Patients</p>
                <p className="text-2xl text-[#334155] leading-[50px]">{patient.totalPatients}</p>
            </div>
            <div className="px-5 py-5 bg-slate-50 rounded-lg h-35 min-w-80 shrink-0 border-s-2 border-green-500">
                <p>Completed</p>
                <p className="text-2xl text-sky-500 leading-[50px]">{patient.completed}</p>
            </div>
            <div className="px-5 py-5 bg-slate-50 rounded-lg h-35 min-w-80 shrink-0 border-s-2 border-green-500">
                <p>Pending</p>
                <p className="text-2xl text-green-500 leading-[50px]">{patient.pending}</p>
            </div>
        </div>
    );
}