import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);

    useEffect(() => {
        if (location.state && location.state.appointment) {
            setBookingData(location.state);
        } else {
            navigate(-1);
        }
    }, [location, navigate]);

    const handlePay = () => {
        // Generate PDF
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text("Payment Receipt & Appointment Details", 20, 20);
        doc.setFontSize(12);
        if (bookingData) {
            const { appointment, doctorName, patientName } = bookingData;
            doc.text(`Patient Name: ${patientName}`, 20, 40);
            doc.text(`Doctor Name: Dr. ${doctorName}`, 20, 50);
            doc.text(`Appointment Date: ${appointment.appointmentDate}`, 20, 60);
            doc.text(`Appointment Time: ${appointment.appointmentTime}`, 20, 70);
            doc.text(`Status: Paid successfully`, 20, 80);
        }
        doc.save("appointment_receipt.pdf");

        // Redirect back with state indicating success
        navigate(`/${bookingData.patientId}/patient`, { state: { bookingSuccess: true } });
    };

    if (!bookingData) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center border border-slate-100">
                <h2 className="text-3xl font-black text-slate-800 mb-6">Payment</h2>
                <p className="text-slate-500 mb-8 font-medium">Please proceed to pay your appointment fee.</p>
                
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl mb-8 flex justify-between items-center shadow-inner">
                    <span className="font-semibold text-lg">Total Amount</span>
                    <span className="font-black text-2xl">₹{bookingData.fee || 0}</span>
                </div>

                <button 
                    onClick={handlePay}
                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition"
                >
                    Pay Successfully
                </button>
            </div>
        </div>
    );
}
