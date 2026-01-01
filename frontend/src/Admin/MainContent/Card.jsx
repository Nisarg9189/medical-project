import { useState, useEffect } from "react";

export default function Card({ adminId }) {
    let [cardData, setCardData] = useState({
        totalCamps: 0,
        activeDoctors: 0,
        villagesCovered: 0
    });

    useEffect(() => {
        //fetch card data from backend
        try {
            const fetchCardData = async () => {
                let response = await fetch(`https://backend-lugs.onrender.com/admin/${adminId}/card-details`, {
                    method: "GET",
                    credentials: "include"
                });
                let data = await response.json();
                // console.log(data);
                if (!data.ok) {
                    alert("Unauthorized Access");
                    return;
                }
                // console.log(data);
                setCardData(data);
            }
            fetchCardData();
        } catch (error) {
            console.log(error);
        }
    }, [adminId])
    return (
        <div id="cardList" className="mt-10 flex gap-5 items-start w-full overflow-x-auto">
            <div className="px-5 py-5 bg-white rounded-lg h-35 w-52 shrink-0 border border-gray-500">
                <p>Total Campus</p>
                <p className="text-2xl text-[#334155] leading-[50px]">{cardData.totalCamps}</p>
                <p>This month</p>
            </div>
            {/* <div className="px-5 py-5 bg-white rounded-lg h-35 w-52 shrink-0 border border-gray-500">
                <p>Registered Patients</p>
                <p className="text-2xl text-sky-500 leading-[50px]">{cardData.registeredPatients}</p>
                <p>All time</p>
            </div> */}
            <div className="px-5 py-5 bg-white rounded-lg h-35 w-52 shrink-0 border border-gray-500">
                <p>Active Doctors</p>
                <p className="text-2xl text-green-500 leading-[50px]">{cardData.activeDoctors}</p>
                <p>Available</p>
            </div>
            <div className="px-5 py-5 bg-white rounded-lg h-35 w-52 shrink-0 border border-gray-500">
                <p>Villages Covered</p>
                <p className="text-2xl text-sky-500 leading-[50px]">{cardData.villagesCovered}</p>
                <p>This year</p>
            </div>
        </div>
    );
}