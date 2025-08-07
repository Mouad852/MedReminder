import React, { useState } from "react";
import { specialties, doctors } from "../../utils/BookAppointmentData";
import {
  CalendarIcon,
  UserIcon,
  Clock,
  Stethoscope,
  HeartPulse,
  Brain,
  Bone,
  User,
  Eye,
  Baby,
} from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom"; // add this

const BookAppointmentPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [flowType, setFlowType] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const specialtyIcons = {
    Cardiology: <HeartPulse className="inline mr-2 text-red-500" size={18} />,
    Dermatology: (
      <Stethoscope className="inline mr-2 text-green-500" size={18} />
    ),
    Neurology: <Brain className="inline mr-2 text-purple-500" size={18} />,
    Pediatrics: <Baby className="inline mr-2 text-pink-500" size={18} />,
    Orthopedics: <Bone className="inline mr-2 text-yellow-600" size={18} />,
    Psychiatry: <User className="inline mr-2 text-indigo-500" size={18} />,
    Ophthalmology: <Eye className="inline mr-2 text-cyan-500" size={18} />,
  };

  const filteredDoctors = doctors.filter(
    (doc) => doc.specialty === selectedSpecialty
  );
  const availableDates = selectedDoctor
    ? Object.keys(selectedDoctor.availableDates)
    : [];

  const handleConfirm = () => {
    if (selectedDoctor && selectedDate && selectedTime) {
      alert(
        `Booked with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}`
      );
      navigate("/appointments");
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6 min-h-screen flex flex-col">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 flex-grow">
          <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
            📅 Book an Appointment
          </h1>

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Choose a Specialty
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {specialties.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => {
                      setSelectedSpecialty(spec);
                      setStep(2);
                    }}
                    className={`flex items-center gap-2 border rounded-xl px-4 py-3 font-medium transition hover:shadow-md hover:cursor-pointer ${
                      selectedSpecialty === spec
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-300 hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    {specialtyIcons[spec]} {spec}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-700">
                How would you like to proceed?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setFlowType("doctor");
                    setStep(3);
                  }}
                  className="flex-1 border border-blue-600 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition font-medium hover:cursor-pointer"
                >
                  <UserIcon className="inline-block mr-2" size={18} /> Select
                  Doctor First
                </button>
                <button
                  onClick={() => {
                    setFlowType("date");
                    setStep(3);
                  }}
                  className="flex-1 border border-blue-600 text-blue-600 px-4 py-3 rounded-xl hover:bg-blue-50 transition font-medium hover:cursor-pointer"
                >
                  <CalendarIcon className="inline-block mr-2" size={18} />{" "}
                  Select Date First
                </button>
              </div>
            </div>
          )}

          {step === 3 && flowType === "doctor" && (
            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Choose a Doctor
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredDoctors.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      className={`rounded-xl px-4 py-3 transition border font-medium hover:shadow hover:cursor-pointer ${
                        selectedDoctor?.id === doc.id
                          ? "border-blue-600 bg-blue-50 text-blue-800"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {doc.name} -{" "}
                      <span className="text-sm text-gray-500">
                        {doc.specialty}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDoctor && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                    Select a Date
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {availableDates.map((date) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border hover:cursor-pointer ${
                          selectedDate === date
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <CalendarIcon className="inline mr-1" size={16} />{" "}
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                    Select a Time
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedDoctor?.availableDates[selectedDate].map(
                      (time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border hover:cursor-pointer ${
                            selectedTime === time
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <Clock className="inline mr-1" size={16} /> {time}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {selectedTime && (
                <button
                  onClick={handleConfirm}
                  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold hover:cursor-pointer"
                >
                  ✅ Confirm Appointment
                </button>
              )}
            </div>
          )}

          {step === 3 && flowType === "date" && (
            <div className="mt-8 space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Choose a Date
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    ...new Set(
                      filteredDoctors.flatMap((doc) =>
                        Object.keys(doc.availableDates)
                      )
                    ),
                  ].map((date) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border hover:cursor-pointer ${
                        selectedDate === date
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <CalendarIcon className="inline mr-1" size={16} /> {date}
                    </button>
                  ))}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                    Available Doctors
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredDoctors
                      .filter((doc) => doc.availableDates[selectedDate])
                      .map((doc) => (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDoctor(doc)}
                          className={`border px-4 py-3 rounded-xl hover:bg-blue-50 transition font-medium hover:cursor-pointer ${
                            selectedDoctor?.id === doc.id
                              ? "border-blue-600 text-blue-800 bg-blue-50"
                              : "border-gray-300 text-gray-700"
                          }`}
                        >
                          <UserIcon
                            className="inline mr-2 text-blue-500"
                            size={16}
                          />{" "}
                          {doc.name}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {selectedDoctor && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-700 mt-4 mb-2">
                    Choose a Time
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {selectedDoctor.availableDates[selectedDate].map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border hover:cursor-pointer ${
                          selectedTime === time
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Clock className="inline mr-1" size={16} /> {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTime && (
                <button
                  onClick={handleConfirm}
                  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold hover:cursor-pointer"
                >
                  ✅ Confirm Appointment
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookAppointmentPage;
