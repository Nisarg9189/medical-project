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
import GlobalLoader from "./GlobalLoader";
import Room from "./Room"
// Simple 404 page
function NotFoundPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Oops! Page not found.</p>
      <a href="/" className="text-blue-500 underline">Go Home</a>
    </div>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalLoader />
        <Routes>
         <Route path="/" element={<AuthForm />} />
          {/* Default page */}
          <Route path="/:adminId/admin" element={<>
            <Header />
            <MainContent />
          </>
          } />
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

          <Route path="/room/:roomId" element={< Room />} />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
