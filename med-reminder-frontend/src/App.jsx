import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // <-- import Toaster
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
      {/* Global toast notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#1c1c1c",
            color: "#fff",
            padding: "16px 20px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // green
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red
              secondary: "#fff",
            },
          },
        }}
      />

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
