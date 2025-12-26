import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreateForm({adminId}) {
    const navigate = useNavigate();
    return (
        <>
            {/* {!backAdmin && ( */}
                <div id="cardList" className="mt-5 flex gap-5 items-center justify-start w-full overflow-x-auto">

                    <div className="px-5 py-5 bg-white rounded-lg w-[437px] h-[250px] shrink-0 border border-sky-500">
                        <div className="">
                            <i className="fa-solid fa-suitcase-medical" id="icon"></i>
                        </div>
                        <p className="text-2xl text-[#334155] leading-[50px]">Create Medical Camp</p>
                        <p>Schedule a new medical camp in a village</p>

                        {/* <form> */}
                        <button type="button" onClick={() => navigate(`/${adminId}/create-camp`)} className="bg-sky-500 px-2 py-5 mt-5 w-full rounded-lg">Create Camp</button>
                        {/* </form> */}
                    </div>
                    <div className="px-5 py-5 bg-white rounded-lg w-[437px] h-[250px] shrink-0 border border-green-500">
                        <div>
                            <i className="fa-solid fa-user-doctor" id="icon"></i>
                        </div>
                        <p className="text-2xl text-[#334155] leading-[50px]">Manage Doctors</p>
                        <p>Add doctors and assign them to camps</p>

                        {/* <form> */}
                            <button type="button" onClick={() => navigate(`/${adminId}/create-doctor`)} className="bg-green-500 px-2 py-5 mt-5 w-full rounded-lg">Manage Doctor</button>
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