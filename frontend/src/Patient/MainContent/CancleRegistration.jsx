export default function CancleRegistration({ patientId, campId }) {
    
    // console.log("CancleRegistration Props:", patientId, campId);

    const cancleRegistrationHandler = async () => {
        // API call to backend for cancelling registration
        console.log("Cancelling Registration...");
    }

    return (
        <button 
            className="shrink-0 px-6 py-3 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl text-white font-bold shadow-[0_5px_15px_rgba(244,63,94,0.3)] hover:from-rose-600 hover:to-red-700 hover:shadow-[0_8px_20px_rgba(244,63,94,0.4)] transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2" 
            onClick={cancleRegistrationHandler}
        >
            <i className="fa-solid fa-ban"></i> Cancel
        </button>
    );
}