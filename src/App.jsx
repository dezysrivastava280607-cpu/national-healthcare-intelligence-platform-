import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import MedicalReports from "./pages/MedicalReports";
import ReportDetails from "./pages/ReportDetails";
import MedicalHistory from "./pages/MedicalHistory";
import Appointments from "./pages/Appointments";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Patient */}
        <Route
          path="/patient-dashboard"
          element={<PatientDashboard />}
        />

        <Route
          path="/reports"
          element={<MedicalReports />}
        />

        <Route
          path="/reports/:reportId"
          element={<ReportDetails />}
        />

        <Route
          path="/history"
          element={<MedicalHistory />}
        />

        <Route
          path="/appointments"
          element={<Appointments />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;