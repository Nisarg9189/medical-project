import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreateForm({patientId}) {
    const navigate = useNavigate();
    return (
        <>
            {/* {!backAdmin && ( */}
                <div id="cardList" className="mt-5 flex gap-5 items-center justify-start w-full overflow-x-auto">

                    <div className="px-5 py-5 bg-white rounded-lg w-[437px] h-[250px] shrink-0 border border-green-500">
                        <div className="">
                            <i className="fa-solid fa-suitcase-medical" id="patientBookIcon"></i>
                        </div>
                        <p className="text-2xl text-[#334155] leading-[50px]">Book Appointment</p>
                        <p>Schedule your visit to the medical camp</p>

                        {/* <form> */}
                        <button type="button" onClick={() => navigate(`/${patientId}/book`)} className="bg-green-500 px-2 py-5 mt-5 w-full rounded-lg">Book now</button>
                        {/* </form> */}
                    </div>
                    <div className="px-5 py-5 bg-white rounded-lg w-[437px] h-[250px] shrink-0 border border-sky-500">
                        <div>
                            <i className="fa-solid fa-file-medical" id="patientReportIcon"></i>
                        </div>
                        <p className="text-2xl text-[#334155] leading-[50px]">My Reports</p>
                        <p>View and download your medical reports</p>

                        {/* <form> */}
                            <button type="button" onClick={() => navigate(`/${patientId}/reports`)} className="bg-sky-500 px-2 py-5 mt-5 w-full rounded-lg">View Reports</button>
                        {/* </form> */}
                    </div>

                </div>
            {/* )}; */}

            {/* {CreateForm && ( */}
                {/* <CreateCamp setCreateForm = {setCreateForm}/> */}
            {/* )} */}
        </>

    );
}