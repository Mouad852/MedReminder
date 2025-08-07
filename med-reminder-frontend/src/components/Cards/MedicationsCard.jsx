import { MdMedication } from "react-icons/md";
import { FaPills } from "react-icons/fa";

const MedicationsCard = () => {
  const meds = [
    { name: "Medication 1", dosage: "500mg", time: "8:00 AM" },
    { name: "Medication 1", dosage: "500mg", time: "8:00 AM" },
    { name: "Medication 1", dosage: "500mg", time: "8:00 AM" },
  ];

  return (
    <div className="bg-blue-300 p-4 rounded-2xl w-full shadow-lg">
      {/* Header */}
      <div className="bg-blue-500 p-2 rounded-t-xl flex items-center gap-2">
        <MdMedication className="text-white  w-6 h-6" />
        <h2 className="text-lg font-bold text-white">Today’s Medications</h2>
      </div>

      {/* Medications List */}
      <div className="bg-blue-300 p-4 space-y-4">
        {meds.map((med, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaPills className="text-black w-6 h-6" />
              <div>
                <p className="font-semibold text-black">{med.name}</p>
                <p className="text-sm text-gray-800">{med.time}</p>
              </div>
            </div>
            <div className="text-black font-semibold">{med.dosage}</div>
            <input type="checkbox" className="w-5 h-5" />
          </div>
        ))}
      </div>

      {/* View Button */}
      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
          <MdMedication className="w-5 h-5" />
          View Medications
        </button>
      </div>
    </div>
  );
};

export default MedicationsCard;
