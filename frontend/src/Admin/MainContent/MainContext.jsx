import { useState } from "react";
import Card from "./Card";
import CreateForm from "./CreateForm";
import RightBoard from "./RightBoard";
import UpcomingCamps from "./UpcomingCamps";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function MainContent() {
    const { adminId } = useParams();
    // console.log(adminId);
    return (
        <>

            {/* <div className="h-full rounded px-10 py-5 border-t-2 border-t-green-500 container mx-auto flex flex-col gap-5 bg-gradient-to-br from-indigo-50 to-sky-200 flex-wrap shadow-lg">
                    <h1 className="text-3xl text-[#334155] font-semibold">Medical Service Dashboard</h1>
                    <p className="text-sm">Manage camps, doctors, and view overall statistics</p>
                
                    <div className="flex gap-5">
                        <div className="flex-shrink-0">
                            <Card adminId={adminId} />
                            <CreateForm adminId={adminId} />
                            <UpcomingCamps adminId={adminId} />
                        </div>

                        <div className="bg-white w-full px-5 py-5 rounded-lg border border-green-500">
                            <RightBoard />
                        </div>
                    </div>
               
                </div> */}

            <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-teal-50 flex justify-center container mx-auto">
  <div className="max-w-7xl w-full px-8 py-8">

    {/* HEADER */}
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-blue-700">Admin Dashboard</h1>
      <p className="text-sm text-blue-600">
        Manage medical camps, doctors & system operations
      </p>
    </div>

    {/* MAIN LAYOUT */}
    <div className="flex flex-col xl:flex-row gap-8">

      {/* LEFT SECTION */}
      <div className="w-full xl:w-1/3 flex flex-col gap-6">

        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition">
          <Card adminId={adminId} />
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition">
          <CreateForm adminId={adminId} />
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition">
          <UpcomingCamps adminId={adminId} />
        </div>

      </div>

      {/* RIGHT SECTION — Hidden Below 1280px */}
      <div id="cardList" className="flex-1 hidden lg:block bg-white rounded-2xl shadow-md border border-blue-100 px-4 pb-4 hover:shadow-lg transition min-h-[600px] max-h-[1050px] overflow-y-auto">
        <RightBoard />
      </div>

    </div>

  </div>
</div>




        </>
    );
}