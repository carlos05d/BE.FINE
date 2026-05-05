import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import RoleSelect from "./pages/RoleSelect";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/role-select" element={<RoleSelect />} />
      <Route path="/patient-dashboard" element={<PatientDashboard />} />
      <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
