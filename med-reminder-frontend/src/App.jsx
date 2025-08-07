import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import DisplayAppointments from "./pages/Appointments/displayAppointments";
import DisplayMedications from "./pages/Medications/displayMedication";
import AddMedication from "./pages/Medications/addMedication";
import BookAppointmentPage from "./pages/Appointments/BookAppointment";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments" element={<DisplayAppointments />} />
        <Route path="/book" element={<BookAppointmentPage />} />
        <Route path="/medications" element={<DisplayMedications />} />
        <Route path="/medications/add-medication" element={<AddMedication />} />
      </Routes>
    </Router>
  );
};

export default App;
