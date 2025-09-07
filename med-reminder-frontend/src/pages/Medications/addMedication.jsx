import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { createMedication } from "../../services/medicationService";
import toast from "react-hot-toast";

// Reusable Components
const Button = ({
  children,
  className = "",
  onClick,
  variant = "default",
  size = "md",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors";
  const variantClasses = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 text-gray-700",
  };
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", type = "text", ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Select = ({ value, onChange, children, className = "" }) => (
  <select
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
  >
    {children}
  </select>
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`flex min-h-[100px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "", ...props }) => (
  <label
    className={`text-sm font-medium text-gray-700 ${className}`}
    {...props}
  >
    {children}
  </label>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-lg border bg-white shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`border-b p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-xl font-semibold text-blue-600 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Icons
const SaveIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const XIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const AddMedication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    dosageUnit: "mg",
    frequency: "daily",
    timesPerDay: 1,
    times: ["00:00"],
    startDate: "",
    endDate: "",
    reminderMethod: "app",
    enableReminders: true,
    notes: "",
  });

  const handleInputChange = (field, value, index) => {
    setFormData((prev) => {
      if (field === "dosage" || field === "timesPerDay") {
        return { ...prev, [field]: value === "" ? "" : parseInt(value, 10) };
      }
      if (field === "enableReminders") {
        return { ...prev, [field]: Boolean(value) };
      }
      if (field === "times" && typeof index === "number") {
        const newTimes = [...prev.times];
        newTimes[index] = value;
        return { ...prev, times: newTimes };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.dosage) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        ...formData,
        startDate: formData.startDate || new Date().toISOString(),
        endDate: formData.endDate || null,
        status: "ACTIVE", // must match backend enum
        instruction: "NONE",
        form: "PILL",
        times: formData.times, // optional
      };

      await createMedication(payload);
      toast.success(`${formData.name} has been added successfully`);
      navigate("/medications");
    } catch (error) {
      console.error("Error creating medication:", error);
      toast.error("Failed to add medication. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/medications");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Medication
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to schedule your medication
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Medication Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Medication Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Medication Name *</Label>
              <Input
                id="name"
                placeholder="Enter medication name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="h-12"
              />
            </div>

            {/* Dosage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="dosage">Dosage *</Label>
                <Input
                  id="dosage"
                  placeholder="Enter dosage amount"
                  value={formData.dosage}
                  onChange={(e) => handleInputChange("dosage", e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label>Unit</Label>
                <Select
                  value={formData.dosageUnit}
                  onChange={(e) =>
                    handleInputChange("dosageUnit", e.target.value)
                  }
                  className="h-12"
                >
                  <option value="mg">mg</option>
                  <option value="g">g</option>
                  <option value="ml">ml</option>
                  <option value="tablets">tablets</option>
                  <option value="drops">drops</option>
                </Select>
              </div>
            </div>

            {/* Frequency and Times per Day */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Frequency *</Label>
                <Select
                  value={formData.frequency}
                  onChange={(e) =>
                    handleInputChange("frequency", e.target.value)
                  }
                  className="h-12"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="custom">Custom</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timesPerDay">Times per Day</Label>
                <Input
                  id="timesPerDay"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.timesPerDay}
                  onChange={(e) =>
                    handleInputChange("timesPerDay", e.target.value)
                  }
                  className="h-12"
                />
              </div>
            </div>

            {/* Time Pickers */}
            {Array.from({ length: formData.timesPerDay }).map((_, idx) => (
              <div className="space-y-2" key={idx}>
                <Label>{`Time ${idx + 1}`}</Label>
                <Input
                  type="time"
                  value={formData.times[idx] || ""}
                  onChange={(e) =>
                    handleInputChange("times", e.target.value, idx)
                  }
                  className="h-12"
                />
              </div>
            ))}

            {/* Start and End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>

            {/* Reminder Method */}
            <div className="space-y-2">
              <Label>Reminder Method</Label>
              <Select
                value={formData.reminderMethod}
                onChange={(e) =>
                  handleInputChange("reminderMethod", e.target.value)
                }
                className="h-12"
              >
                <option value="app">App Notification</option>
                <option value="sms">SMS</option>
                <option value="email">Email</option>
              </Select>
            </div>

            {/* Enable Reminders Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
              <div>
                <Label className="block mb-1">Enable Reminders</Label>
                <p className="text-sm text-gray-500">
                  Get notified when it's time to take your medication
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableReminders}
                  onChange={(e) =>
                    handleInputChange("enableReminders", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this medication..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                onClick={handleSave}
                className="flex-1 h-12 hover:cursor-pointer"
                size="lg"
              >
                <SaveIcon />
                Save Medication
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-12"
                size="lg"
              >
                <XIcon />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AddMedication;
