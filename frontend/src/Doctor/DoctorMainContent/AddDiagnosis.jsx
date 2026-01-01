import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useLoading } from "../../LoadingContext";

export default function AddDiagnosis() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const {appointmentId} = useParams();
  console.log("Appointment ID:", appointmentId);
  const [formData, setFormData] = useState({
    symptoms: "",
    diagnosis: "",
    prescription: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
    // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response = await fetch(`https://backend-lugs.onrender.com/doctors/addDiagnosis/${appointmentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
      });
      let data = await response.json();
      if(data.ok && !data.ok) {
        alert("Error");
        return;
      }
      // console.log("Response Data:", data);
      alert("Diagnosis added successfully!");
      navigate(-1); // Navigate back to the previous page
    } catch (error) {
      console.error("Error adding diagnosis:", error);
      alert("Failed to add diagnosis. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 z-10">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-xl font-bold">Add Diagnosis</h2>
            <p className="text-gray-600">
              Record diagnosis and prescription for patient
            </p>
          </div>

          <div className="space-y-4">
            {/* Patient Info */}
            {/* <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm">
                <strong>Patient:</strong> Nisarg
              </p>
              <p className="text-sm">
                <strong>Age:</strong> 18 | <strong>Token:</strong> 1
              </p>
            </div> */}

            {/* Symptoms */}
            <div className="space-y-1">
              <label htmlFor="symptoms" className="text-sm font-medium">
                Symptoms
              </label>
              <textarea
                name="symptoms"
                id="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="Enter patient symptoms"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            {/* Diagnosis */}
            <div className="space-y-1">
              <label htmlFor="diagnosis" className="text-sm font-medium">
                Diagnosis
              </label>
              <textarea
                name="diagnosis"
                id="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder="Enter diagnosis"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            {/* Prescription */}
            <div className="space-y-1">
              <label htmlFor="prescription" className="text-sm font-medium">
                Prescription
              </label>
              <textarea
                name="prescription"
                id="prescription"
                value={formData.prescription}
                onChange={handleChange}
                placeholder="Enter prescription details"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Save Diagnosis
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black" onClick={() => navigate(-1)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
