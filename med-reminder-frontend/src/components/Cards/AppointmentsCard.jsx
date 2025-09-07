import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { getAppointments } from "../../services/appointmentService";
import { useNavigate } from "react-router-dom";

const AppointmentsCard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        console.log("Appointments fetched:", data);
        setAppointments(data);
      } catch (err) {
        setError("Failed to fetch appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewAppointments = () => {
    navigate("/appointments");
  };

  // Get next 3 upcoming appointments
  const getNextAppointments = () => {
    if (!appointments || appointments.length === 0) return [];

    const upcoming = appointments
      .map((appt) => ({
        ...appt,
        dateTime: new Date(appt.date), // use date directly
      }))
      .filter((appt) => appt.dateTime > new Date() && appt.status === "BOOKED")
      .sort((a, b) => a.dateTime - b.dateTime);

    return upcoming.slice(0, 3); // return first 3
  };

  const nextAppointments = getNextAppointments();

  if (loading) {
    return (
      <div className="bg-blue-300 p-4 rounded-2xl w-full shadow-lg text-white">
        Loading appointments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-300 p-4 rounded-2xl w-full shadow-lg text-white">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-blue-300 p-4 rounded-2xl w-full shadow-lg">
      {/* Header */}
      <div className="bg-blue-500 p-2 rounded-t-xl flex items-center gap-2">
        <FaCalendarAlt className="text-white w-5 h-5" />
        <h2 className="text-lg font-bold text-white">Next Appointments</h2>
      </div>

      {/* Next Appointments */}
      <div className="p-4 space-y-4">
        {nextAppointments.length > 0 ? (
          nextAppointments.map((appt) => (
            <div key={appt.id} className="flex items-center gap-3">
              <FaCalendarAlt className="text-black w-6 h-6" />
              <div>
                <p className="font-semibold text-black">
                  {appt.doctor?.specialty || "N/A"} -{" "}
                  {appt.doctor?.location || "N/A"}
                </p>
                <p className="text-sm text-gray-800">
                  {appt.dateTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  at{" "}
                  {appt.dateTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-center">No upcoming appointments.</p>
        )}
      </div>

      {/* View Appointments Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleViewAppointments}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl cursor-pointer"
        >
          <FaCalendarAlt className="w-5 h-5" />
          View All
        </button>
      </div>
    </div>
  );
};

export default AppointmentsCard;
