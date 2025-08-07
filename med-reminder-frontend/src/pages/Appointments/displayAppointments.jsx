import React, { useState, useEffect } from "react";
import { appointments } from "../../utils/Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCalendarDays,
  faPenToSquare,
  faBell,
  faPhoneAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // added
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AddAppointments from "./addAppointmentModal";

const DisplayAppointments = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // added

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />

      <main className="flex-1 max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 mx-auto">
        {/* Title + Action Buttons */}
        <div className="mb-6 flex items-start justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>

          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-1.5 rounded-full font-medium text-sm shadow-md hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-3 font" />
              Add Appointment
            </button>
            <button
              onClick={() => navigate("/book")}
              className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-1.5 rounded-full font-medium text-sm shadow-md flex items-center justify-center hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faPhoneAlt} className="mr-3" />
              Book Appointment
            </button>
          </div>
        </div>

        {/* Next Appointment Card */}
        <div className="bg-blue-100 rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex items-center text-blue-900 font-semibold mb-2">
            <FontAwesomeIcon icon={faBell} className="mr-2 text-blue-800" />
            Next appointment
          </div>
          <p className="text-sm text-gray-800">
            Your next appointment is on{" "}
            <span className="font-bold">Monday 25 July 2025</span>, at{" "}
            <span className="font-bold">10 o'clock</span>.
          </p>
        </div>

        {/* Appointment Table */}
        <div className="overflow-auto bg-white shadow-md rounded-xl max-h-[500px]">
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-blue-100 text-left text-gray-700">
              <tr>
                <th
                  colSpan={6}
                  className="px-6 py-3 font-semibold text-base border-b border-blue-200"
                >
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="mr-2 text-blue-700"
                  />
                  Appointment List
                </th>
              </tr>
              <tr className="text-sm bg-blue-50 border-t border-blue-200">
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Doctor</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{appointment.date}</td>
                  <td className="px-6 py-4">{appointment.time}</td>
                  <td className="px-6 py-4">{appointment.doctor}</td>
                  <td className="px-6 py-4">{appointment.location}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        appointment.status === "Upcoming"
                          ? "bg-blue-500"
                          : appointment.status === "Done"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 transition hover:cursor-pointer">
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                    <button className="text-red-600 hover:text-red-800 transition hover:cursor-pointer">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <Footer />

      {/* Add Appointment Modal */}
      <AddAppointments isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default DisplayAppointments;
