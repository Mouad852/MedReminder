import { useEffect, useState } from "react";
import { MdMedication } from "react-icons/md";
import { FaPills } from "react-icons/fa";
import { getMedications } from "../../services/medicationService"; // import your service
import { useNavigate } from "react-router-dom";

const MedicationsCard = () => {
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch medications from backend
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const data = await getMedications();
        setMeds(data);
      } catch (err) {
        setError("Failed to fetch medications");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedications();
  }, []);

  // Navigate to medications page
  const handleViewMedications = () => {
    navigate("/medications");
  };

  // Get next dose time for a medication
  const getNextDoseTime = (medication) => {
    if (!medication.times || medication.times.length === 0) return "N/A";

    const now = new Date();
    const today = now.toISOString().split("T")[0];

    // Convert each time string to Date object
    const doseTimes = medication.times.map((timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const doseDate = new Date(today);
      doseDate.setHours(hours, minutes, 0, 0);
      return doseDate;
    });

    // Find next dose
    const nextDose = doseTimes.find((doseTime) => doseTime > now);

    // If all doses passed, return first dose of tomorrow
    const next =
      nextDose ||
      (() => {
        const firstDoseTomorrow = new Date(doseTimes[0]);
        firstDoseTomorrow.setDate(firstDoseTomorrow.getDate() + 1);
        return firstDoseTomorrow;
      })();

    // Format with AM/PM
    return next.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="bg-blue-300 p-4 rounded-2xl w-full shadow-lg text-white">
        Loading medications...
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
        <MdMedication className="text-white w-6 h-6" />
        <h2 className="text-lg font-bold text-white">Today’s Medications</h2>
      </div>

      {/* Medications List */}
      <div className="bg-blue-300 p-4 space-y-4">
        {meds.length === 0 ? (
          <p className="text-white text-center">No medications for today.</p>
        ) : (
          meds.map((med) => (
            <div key={med.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaPills className="text-black w-6 h-6" />
                <div>
                  <p className="font-semibold text-black">{med.name}</p>
                  <p className="text-sm text-gray-800">
                    {getNextDoseTime(med)}
                  </p>
                </div>
              </div>
              <div className="text-black font-semibold">{med.dosage}</div>
              <input type="checkbox" className="w-5 h-5" />
            </div>
          ))
        )}
      </div>

      {/* View Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handleViewMedications}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl cursor-pointer"
        >
          <MdMedication className="w-5 h-5" />
          View Medications
        </button>
      </div>
    </div>
  );
};

export default MedicationsCard;
