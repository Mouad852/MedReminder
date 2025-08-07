import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPlus,
  faCalendarDays,
  faClock,
  faUser,
  faLocationDot,
  faXmark,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/DarkLogo";

const AddAppointments = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    doctor: "",
    location: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Data:", formData);
    alert("Appointment added successfully!");
    setFormData({ date: "", time: "", doctor: "", location: "", note: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex justify-center items-center z-50 px-4">
      <div className="bg-white w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl transition"
          title="Close"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Logo />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-6 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faPlus} /> Add New Appointment
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="mr-2 text-blue-600"
              />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FontAwesomeIcon icon={faClock} className="mr-2 text-blue-600" />
              Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
              Doctor's Name
            </label>
            <input
              type="text"
              name="doctor"
              placeholder="Ex: Dr. Ahmed"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-2 text-blue-600"
              />
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Hospital name or address"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Optional Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FontAwesomeIcon
                icon={faNoteSticky}
                className="mr-2 text-blue-600"
              />
              Notes <span className="text-gray-400 text-sm">(Optional)</span>
            </label>
            <textarea
              name="note"
              rows={3}
              placeholder="Additional info..."
              value={formData.note}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-all shadow-sm hover:shadow-md"
          >
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
            Save Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointments;
