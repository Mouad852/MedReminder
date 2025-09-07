import React, { useState, useEffect } from "react";
import {
  createAppointment,
  getDoctors,
} from "../../services/appointmentService";
import toast from "react-hot-toast";
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
import { useNavigate } from "react-router-dom";

const BookAppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [flowType, setFlowType] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [specialties, setSpecialties] = useState([]);
  const [cities, setCities] = useState([]); // list of all cities where doctors are
  const [userCity, setUserCity] = useState(""); // selected city

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
    (doc) => doc.specialty === selectedSpecialty && doc.location === userCity
  );
  const availableDates = selectedDoctor?.availableDates
    ? Object.keys(selectedDoctor.availableDates)
    : [];

  const handleConfirm = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !appointmentType) {
      toast.error(
        "❌ Please select a doctor, date, time, and appointment type."
      );
      return;
    }

    try {
      await createAppointment({
        doctorId: selectedDoctor.id,
        date: selectedDate,
        time: selectedTime,
        type: appointmentType, // ✅ make sure this is sent
      });

      toast.success(
        `✅ Appointment booked with ${
          selectedDoctor.name
        } on ${selectedDate} at ${selectedTime} (${appointmentType.replace(
          "_",
          " "
        )})`
      );
      navigate("/appointments");
    } catch (error) {
      console.error("Failed to book appointment:", error);
      toast.error("❌ Failed to book appointment. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();

        const transformed = res.map((doc) => {
          const availableDates = {};
          doc.availabilities.forEach((slot) => {
            const date = slot.date.split("T")[0];
            if (!availableDates[date]) availableDates[date] = [];
            availableDates[date].push(slot.startTime);
          });
          return { ...doc, availableDates };
        });

        setDoctors(transformed);

        // collect specialties
        const specs = [...new Set(transformed.map((d) => d.specialty))];
        setSpecialties(specs);

        // collect cities
        const citiesList = [...new Set(transformed.map((d) => d.location))];
        setCities(citiesList);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDoctors();
  }, []);

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
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Choose Your City
              </h2>
              <select
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                className="border rounded-xl px-4 py-2 w-full"
              >
                <option value="">-- Select City --</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  onClick={() => {
                    if (!userCity) {
                      toast.error("❌ Please select a city first.");
                      return;
                    }
                    setFlowType("doctor");
                    setStep(3);
                  }}
                  disabled={!userCity}
                  className={`flex-1 border px-4 py-3 rounded-xl transition font-medium ${
                    userCity
                      ? "border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <UserIcon className="inline-block mr-2" size={18} /> Select
                  Doctor First
                </button>

                <button
                  onClick={() => {
                    if (!userCity) {
                      toast.error("❌ Please select a city first.");
                      return;
                    }
                    setFlowType("date");
                    setStep(3);
                  }}
                  disabled={!userCity}
                  className={`flex-1 border px-4 py-3 rounded-xl transition font-medium ${
                    userCity
                      ? "border-blue-600 text-blue-600 hover:bg-blue-50 cursor-pointer"
                      : "border-gray-300 text-gray-400 cursor-not-allowed"
                  }`}
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
                      {doc.user.name} -{" "}
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
                <div className="mt-4 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Select Appointment Type
                  </h2>
                  <div className="flex gap-3">
                    {["CONSULTATION", "CHECKUP", "FOLLOW_UP"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setAppointmentType(type)}
                        className={`px-4 py-2 rounded-lg font-medium border transition hover:cursor-pointer ${
                          appointmentType === type
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {type.replace("_", " ")}
                      </button>
                    ))}
                  </div>

                  {appointmentType && (
                    <button
                      onClick={handleConfirm}
                      className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold hover:cursor-pointer"
                    >
                      ✅ Confirm Appointment
                    </button>
                  )}
                </div>
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
                <div className="mt-4 space-y-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Select Appointment Type
                  </h2>
                  <div className="flex gap-3">
                    {["CONSULTATION", "CHECKUP", "FOLLOW_UP"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setAppointmentType(type)}
                        className={`px-4 py-2 rounded-lg font-medium border transition hover:cursor-pointer ${
                          appointmentType === type
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {type.replace("_", " ")}
                      </button>
                    ))}
                  </div>

                  {appointmentType && (
                    <button
                      onClick={handleConfirm}
                      className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold hover:cursor-pointer"
                    >
                      ✅ Confirm Appointment
                    </button>
                  )}
                </div>
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
