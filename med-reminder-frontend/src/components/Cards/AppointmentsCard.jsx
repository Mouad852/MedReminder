import { FaCalendarAlt } from "react-icons/fa";

const AppointmentsCard = () => {
  const appointments = [
    {
      doctor: "Dr. Docter 1",
      speciality: "Speciality",
      date: "July 15, 2024, 2:00 PM",
    },
    {
      doctor: "Dr. Docter 1",
      speciality: "Speciality",
      date: "July 15, 2024, 2:00 PM",
    },
  ];

  return (
    <div className="bg-blue-300 p-4 rounded-2xl w-full shadow-lg">
      {/* Header */}
      <div className="bg-blue-500 p-2 rounded-t-xl flex items-center gap-2">
        <FaCalendarAlt className="text-white w-5 h-5" />
        <h2 className="text-lg font-bold text-white">Upcomming Appointments</h2>
      </div>

      {/* Appointments List */}
      <div className="p-4 space-y-4">
        {appointments.map((appt, index) => (
          <div key={index} className="flex items-start gap-3">
            <FaCalendarAlt className="w-6 h-6 text-black mt-1" />
            <div>
              <p className="font-semibold text-black">
                {appt.doctor} - {appt.speciality}
              </p>
              <p className="text-sm text-gray-800">{appt.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Calendar Button */}
      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm">
          <FaCalendarAlt className="w-5 h-5" />
          View in Calendar
        </button>
      </div>
    </div>
  );
};

export default AppointmentsCard;
