import DoctorCard from "./DoctorCard";
import DoctorUpcomingPatients from "./DoctorUpcomingPatients";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


export default function DocotrMainContent() {
    const { doctorId } = useParams();
    // console.log("Doctor ID in Doctor Main Content:", doctorId);
    let [doctorDetails, setDoctorDetails] = useState(null);

    useEffect(() => {
        let fetchDoctorDetails = async () => {
            let res = await fetch(`https://backend-lugs.onrender.com/doctors/${doctorId}/details`, {
                method: "GET",
                credentials: "include"
            });
            let data = await res.json();
            if(data.ok && !data.ok) {
                alert("Unauthorized Access");
                return;
            }
            // console.log(data);
            setDoctorDetails(data);
        };
        fetchDoctorDetails();
    }, [doctorId]);

    return (
        // <div className="m-auto w-full h-screen rounded px-5 py-5 border-t-2 border-t-green-500 bg-gradient-to-b from-green-200 to-white">
        //     <h1 className="text-3xl text-[#334155] font-semibold">Welcome, Dr. Sharma</h1>
        //     <p className="text-sm">Today's Schedule - March 15, 2025</p>

        //     <div className="flex flex-col justify-center">
        //     <DoctorCard />
        //     <DoctorUpcomingPatients doctorId={doctorId} />
        //     </div>
        // </div>
        // </div>
    
    <div className="m-auto w-full h-fit px-5 py-6 bg-gradient-to-br from-indigo-50 to-sky-200 container mx-auto">
        {/* <DoctorHeader /> */}
    {/* Heading */}
    <div className="my-6">
        <h1 className="text-3xl text-[#1e293b] font-bold tracking-tight">
            Welcome, Dr. {doctorDetails ? doctorDetails.name : 'Loading...'}
        </h1>
        <p className="text-sm text-gray-600">
            Today's Schedule - {new Date().toLocaleDateString()}
        </p>
    </div>

    {/* Main Content */}
    <div className="flex flex-col gap-6">
        
        {/* Doctor Profile Card */}
        <div className="bg-white shadow-lg shadow-green-100 rounded-xl p-6 border border-green-200">
            <DoctorCard doctorId={doctorId} />
        </div>

        {/* Upcoming Patients Section */}
        <div className="bg-white shadow-md shadow-green-100 rounded-xl p-6 border border-green-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-3"><i className="fa-regular fa-calendar"></i>Today's Patients</h2>
            <DoctorUpcomingPatients doctorId={doctorId} />
        </div>

    </div>
</div>


    );
}