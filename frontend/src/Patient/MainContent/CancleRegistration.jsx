export default function CancleRegistration({ patientId, campId }) {
    
    // console.log("CancleRegistration Props:", patientId, campId);

    const cancleRegistrationHandler = async () => {
        // API call to backend for cancelling registration
        console.log("Cancelling Registration...");
    }

    return (
        <div>
            <button className="bg-red-500 px-2 py-2 rounded-lg text-white" onClick={cancleRegistrationHandler}>Cancle Registration</button>
        </div>
    );
}