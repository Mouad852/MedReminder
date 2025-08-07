import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const DisplayMedications = () => {
  const [medications, setMedications] = useState([
    {
      id: "1",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      nextDose: "8:00 AM",
      pillColor: "blue",
    },
    {
      id: "2",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      nextDose: "7:00 PM",
      pillColor: "green",
    },
  ]);

  const navigate = useNavigate();

  const handleEdit = (medication) => {
    navigate(`/medications/edit?id=${medication.id}`);
  };

  const handleDelete = (id) => {
    setMedications(medications.filter((m) => m.id !== id));
    console.log(`Medication with ID ${id} has been removed`);
  };

  const handleAddMedication = () => {
    navigate("/medications/add-medication");
  };

  // Icônes locales
  const EditIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>
  );

  const TrashIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
  );

  const PlusIcon = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  // Composant MedicationItem local
  const MedicationItem = ({ medication, onEdit, onDelete }) => {
    return (
      <div className="py-4 px-6 border-b border-gray-200 last:border-b-0">
        <div className="md:hidden">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg">{medication.name}</h3>
              <div className="flex items-center mt-1">
                <span
                  className={`w-3 h-3 rounded-full bg-${medication.pillColor}-500 mr-2`}
                ></span>
                <span className="text-sm text-gray-600">
                  {medication.dosage}
                </span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => onEdit(medication)}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Edit"
              >
                <EditIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(medication.id)}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Frequency:</span>
              <span className="ml-1">{medication.frequency}</span>
            </div>
            <div>
              <span className="text-gray-500">Next dose:</span>
              <span className="ml-1">{medication.nextDose}</span>
            </div>
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-5 gap-4 items-center flex-wrap text-sm">
          <div className="flex items-center">
            <span
              className={`w-3 h-3 rounded-full bg-${medication.pillColor}-500 mr-3`}
            ></span>
            <span className="font-medium">{medication.name}</span>
          </div>
          <div className="text-gray-700">{medication.dosage}</div>
          <div className="text-gray-700">{medication.frequency}</div>
          <div className="text-gray-700">{medication.nextDose}</div>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => onEdit(medication)}
              className="text-blue-600 hover:text-blue-800"
              aria-label="Edit"
            >
              <EditIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(medication.id)}
              className="text-red-600 hover:text-red-800"
              aria-label="Delete"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };
  // Composant Button local
  const Button = ({ children, className, onClick, size = "md", ...props }) => {
    const sizeClasses = {
      sm: "py-1 px-3 text-sm",
      md: "py-2 px-4 text-base",
      lg: "py-3 px-6 text-lg",
    };

    return (
      <button
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white ${sizeClasses[size]} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 py-10">
        {/* Page Header */}
        <div className="relative z-10 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Medications
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your medication schedule
              </p>
            </div>
            <Button
              onClick={handleAddMedication}
              className="mt-4 sm:mt-0 shadow-md hover:cursor-pointer"
              size="lg"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden md:block relative z-10">
          <div className="bg-gray-100 rounded-t-lg p-4">
            <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600">
              <div className="flex items-center space-x-2">
                <span>🧪</span>
                <span>Medication</span>
              </div>
              <div>
                <span>💊 Dosage</span>
              </div>
              <div>
                <span>🔁 Frequency</span>
              </div>
              <div>
                <span>⏰ Next Dose</span>
              </div>
              <div>
                <span>⚙️ Actions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Medications List */}
        <div className="relative z-10 bg-white rounded-b-lg">
          {medications.map((medication) => (
            <MedicationItem
              key={medication.id}
              medication={medication}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Empty State */}
        {medications.length === 0 && (
          <div className="relative z-10 text-center py-12 bg-white rounded-lg">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <PlusIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No medications yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start by adding your first medication
            </p>
            <Button onClick={handleAddMedication} className="shadow-md">
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Your First Medication
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default DisplayMedications;
