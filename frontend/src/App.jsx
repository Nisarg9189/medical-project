import CreateCamp from "./Admin/AdminForms/CreateCamp"
import CreateDoctor from "./Admin/AdminForms/CreateDoctor"
import Header from "./Admin/Header/Header"
import MainContent from "./Admin/MainContent/MainContext"
import AddDiagnosis from "./Doctor/DoctorMainContent/AddDiagnosis"
import DocotrMainContent from "./Doctor/DoctorMainContent/DocotrMainContent"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Patient/MainContent/Home";
import BookAppointment from "./Patient/PatientForm/BookAppoinment"
import AuthForm from "./auth/AuthForm"
import DoctorHeader from "./Doctor/DoctorHeader/DoctorHeader"
import PatientHeader from "./Patient/Header/PatientHeader"
import GenReports from "./Patient/MainContent/GenReports"

function App() {
  return (
    <>
      <BrowserRouter>

        {/* Header always visible */}


        {/* Page content that changes */}
         {/* <div className="bg-gradient-to-b to-sky-200 from-white"> */}
        {/* <Header /> */}
        <Routes>
         <Route path="/" element={<AuthForm />} />
          {/* Default page */}
          {/* <div className="bg-gradient-to-b to-sky-200 from-white"> */}
          <Route path="/:adminId/admin" element={<>
            <Header />
            <MainContent />
          </>
          } />
          {/* </div> */}
          
          {/* When clicking "Create Camp" */}
          <Route path="/:adminId/create-camp" element={<CreateCamp />} />
          <Route path="/:adminId/create-doctor" element={<CreateDoctor />} />
          
          {/* Doctor section */}
          <Route path="/:doctorId/doctor" element={<div className="px-10">
            <DoctorHeader />
            <DocotrMainContent />
          </div>} />

          <Route path="/addDiagnosis/:appointmentId" element={< AddDiagnosis />} />
          <Route path="/:patientId/patient" element={
            <>
              <PatientHeader />
              <Home />
            </>
          } />
          <Route path="/:patientId/book" element={< BookAppointment />} />
          <Route path="/:patientId/reports" element={< GenReports />} />

        </Routes>
        
        {/* </div> */}
      </BrowserRouter>
    </>
  )
}

export default App
