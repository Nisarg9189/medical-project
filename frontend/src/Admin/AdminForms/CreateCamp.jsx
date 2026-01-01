import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

export default function CreateCamp() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const {adminId} = useParams();
    let [data, setData] = useState({
        villageName: "",
        Date: "",
        Time: "",
        doctorId: ""
    });

    let [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            let r = await fetch(`https://backend-lugs.onrender.com/admin/${adminId}/doctors`, {
                method: "GET",
                credentials: "include"
            });
            let doctors = await r.json();
            if(doctors.ok && !doctors.ok) {
                    alert("Unauthorized Access");
                    return;
                }
            // console.log(doctors);
            setDoctors(doctors);
        }

        fetchDoctors();
    }, []);

    let handleSubmit = (e) => {
        console.log(e.target.value);
        console.log(e.target.name);

        let field = e.target.name;
        let newVal = e.target.value;

        setData((currData) => {
            if(field === "doctorId") {
                newVal = newVal.toString();
            }
            currData[field] = newVal;
            return { ...currData };
        })
    }

    let handleCampForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let r = await fetch(`https://backend-lugs.onrender.com/admin/${adminId}/create/camp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });
            // console.log(r.status);
            let backEndData = await r.json();
            if(backEndData.ok && !backEndData.ok) {
                alert("Unauthorized Access");
                return;
            }
            // console.log(backEndData);
            // console.log(data);
            setData({
                villageName: "",
                Date: "",
                Time: "",
                doctorId: ""
            })
            alert("Camp created successfully!");
        } catch (error) {
            console.error("Error creating camp:", error);
            alert("Failed to create camp. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleCampForm}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
                    Create Medical Camp
                </h2>

                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label htmlFor="villageName" className="font-medium mb-1">Village Name</label>
                        <input
                            type="text"
                            placeholder="Enter Village Name"
                            id="villageName"
                            name="villageName"
                            value={data.villageName}
                            onChange={handleSubmit}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Date" className="font-medium mb-1">Date</label>
                        <input
                            type="date"
                            id="Date"
                            name="Date"
                            value={data.Date}
                            onChange={handleSubmit}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Time" className="font-medium mb-1">Time</label>
                        <input
                            type="time"
                            id="Time"
                            name="Time"
                            value={data.Time}
                            onChange={handleSubmit}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="CampType" className="font-medium mb-1">Camp Type</label>
                        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" name="doctorId" value={data.doctorId} onChange={handleSubmit}>
                            <option value="">Select a doctor</option>
                            {doctors.map((doctors) => (
                                <option key={doctors._id} value={doctors._id}>
                                    {doctors.name} - {doctors.specialization}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="flex flex-col">
                        <label htmlFor="AssignDoctor" className="font-medium mb-1">Assign Doctor</label>
                        <input
                            type="text"
                            placeholder="Select doctor"
                            id="AssignDoctor"
                            name="AssignDoctor"
                            value={data.AssignDoctor}
                            onChange={handleSubmit}
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div> */}

                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-all"
                    >
                        Submit
                    </button>
                    <button onClick={() => navigate(-1)}
                        type="button"
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-all"
                    >
                        Cancle
                    </button>
                </div>
            </form>
        </div>
    );
}
