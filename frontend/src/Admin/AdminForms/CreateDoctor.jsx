import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

const API_URL = import.meta.env.VITE_API;

export default function CreateDoctor() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const {adminId} = useParams();
    let [doctor, setDoctor] = useState({
        name: "",
        email: "",
        password: "",
        specialization: ""
    });

    let handleChange = (e) => {
        let field = e.target.name;
        let value = e.target.value;

        setDoctor((prev) => ({ ...prev, [field]: value }));
    };

    let handleDoctorForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let res = await fetch(
                `${API_URL}/admin/${adminId}/create/doctor`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(doctor),
                    credentials: "include"
                }
            );

            let dataBack = await res.json();
            // console.log(dataBack);
            if(dataBack.ok && !dataBack.ok) {
                alert("Unauthorized Access");
                return;
            }

            // clear form
            setDoctor({
                name: "",
                email: "",
                password: "",
                specialization: ""
            });
            alert("Doctor created successfully!");
        } catch (error) {
            console.error("Error creating doctor:", error);
            alert("Failed to create doctor. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleDoctorForm}
                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200"
            >
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-700">
                    Add New Doctor
                </h2>

                <div className="flex flex-col gap-5">

                    {/* Doctor Name */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Doctor Name</label>
                        <input
                            type="text"
                            name="name"
                            value={doctor.name}
                            onChange={handleChange}
                            placeholder="Enter doctor's name"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={doctor.email}
                            onChange={handleChange}
                            placeholder="Doctor email"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={doctor.password}
                            onChange={handleChange}
                            placeholder="Doctor password"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Phone */}
                    {/* <div className="flex flex-col">
                        <label className="font-medium mb-1">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={doctor.phone}
                            onChange={handleChange}
                            placeholder="Mobile number"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div> */}

                    {/* Specialization */}
                    <div className="flex flex-col">
                        <label className="font-medium mb-1">Specialization</label>
                        <input
                            type="text"
                            name="specialization"
                            value={doctor.specialization}
                            onChange={handleChange}
                            placeholder="e.g. General, Dentist, Eye specialist"
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-all"
                    >
                        Add Doctor
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="w-full bg-gray-300 text-black py-2 rounded-lg font-medium hover:bg-gray-400 transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
