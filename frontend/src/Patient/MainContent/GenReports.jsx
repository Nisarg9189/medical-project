import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
export default function GenReports() {
    const { patientId } = useParams();
    let [camps, setCamps] = useState([]);
    let [selectedCamp, setSelectedCamp] = useState({
        campId: ""
    });

    console.log(camps);
    
    useEffect(() => {
        // Fetch camps for the patient
        let fetchCamps = async () => {
            let res = await fetch(`https://backend-lugs.onrender.com/patient/camps/${patientId}`, {
                method: "GET",
                credentials: "include"
            });
            let data = await res.json();
            if(data.ok && !data.ok) {
                alert("Unauthorized Access");
                return;
            }
            setCamps(data);
        };
        fetchCamps();
    }, [patientId]);

    let selectedCampHandler = (e) => {
        setSelectedCamp({
            ...selectedCamp,
            [e.target.name]: e.target.value
        });
    }

    let downloadReport = async () => {
        if(!selectedCamp.campId) {
            alert("Please select a camp to download the report.");
            return;
        }

        let res = await fetch(`https://backend-lugs.onrender.com/patient/${patientId}/report/${selectedCamp.campId}`, {
            method: "GET",
            responseType: "blob",
            credentials: "include"
        });

        if(res.ok) {
            let blob = await res.blob();
            let url = window.URL.createObjectURL(new Blob([blob]));
            let link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Camp_Report_${selectedCamp.campId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } else {
            alert("Failed to download report. Please try again.");
        }

    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg container mt-10">
            <h1 className="text-2xl font-semibold mb-4 text-green-600">
                Download Camp Report
            </h1>

            {/* Select input */}
            <label className="block font-medium mb-1">Select Camp</label>
            <select
                className="w-full border rounded px-3 py-2 mb-4"
                value={selectedCamp.campId}
                onChange={selectedCampHandler}
                name="campId"
            >
                <option value="">-- Choose Camp --</option>
                {camps.map((camp) => (
                    <option key={camp._id} value={camp._id}>
                        {camp.campId.CampType} - ({camp.campId.villageName} on {(new Date(camp.campId.Date)).toLocaleDateString()})
                    </option>
                ))}
            </select>

            {/* Download Button */}
            <button
                onClick={downloadReport}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
                Download PDF Report
            </button>
        </div>
    );
}