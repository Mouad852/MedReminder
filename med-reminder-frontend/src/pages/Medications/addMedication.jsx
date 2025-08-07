import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const AddMedication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    dosageUnit: "mg",
    frequency: "",
    timesPerDay: 1,
    startDate: undefined,
    endDate: undefined,
    reminderMethod: "",
    enableReminders: true,
    notes: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.dosage || !formData.frequency) {
      alert("Please fill in all required fields");
      return;
    }

    alert(`${formData.name} has been added successfully`);
    navigate("/medications");
  };

  const handleCancel = () => {
    navigate("/medications");
  };

  // Icônes locales
  const SaveIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  );

  const XIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const CalendarIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const PillIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M10 2h4"></path>
      <path d="M12 2v4"></path>
      <path d="M4.5 19.5L19.5 4.5"></path>
      <path d="M4.5 4.5L19.5 19.5"></path>
    </svg>
  );

  const DropletsIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </svg>
  );

  const PlusIcon = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  // Composant Button local
  const Button = ({
    children,
    className,
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

  // Composant Card local
  const Card = ({ children, className, ...props }) => (
    <div
      className={`rounded-lg border bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  const CardHeader = ({ children, className, ...props }) => (
    <div className={`border-b p-6 ${className}`} {...props}>
      {children}
    </div>
  );

  const CardTitle = ({ children, className, ...props }) => (
    <h3
      className={`text-xl font-semibold text-blue-600 ${className}`}
      {...props}
    >
      {children}
    </h3>
  );

  const CardContent = ({ children, className, ...props }) => (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );

  // Composant Input local
  const Input = ({ className, ...props }) => (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  // Composant Textarea local
  const Textarea = ({ className, ...props }) => (
    <textarea
      className={`flex min-h-[60px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );

  // Composant Label local
  const Label = ({ children, className, ...props }) => (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );

  // Composant Select local simplifié
  const Select = ({ value, onValueChange, children, className, ...props }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className={`relative ${className}`} {...props}>
        <button
          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          onClick={() => setOpen(!open)}
        >
          <span>{value || "Select..."}</span>
          <svg
            className="h-4 w-4 opacity-50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M6 9l6 6 6-6"></path>
          </svg>
        </button>
        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200">
            <div className="py-1">
              {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                  onSelect: (val) => {
                    onValueChange(val);
                    setOpen(false);
                  },
                })
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const SelectItem = ({ value, children, onSelect }) => (
    <div
      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
      onClick={() => onSelect(value)}
    >
      {children}
    </div>
  );

  // Composant Switch local simplifié
  const Switch = ({ checked, onCheckedChange }) => (
    <button
      type="button"
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        checked ? "bg-blue-600" : "bg-gray-200"
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  // Composant Popover local simplifié
  const Popover = ({ trigger, content }) => {
    const [open, setOpen] = useState(false);

    return (
      <div className="relative">
        <div onClick={() => setOpen(!open)}>{trigger}</div>
        {open && (
          <div className="absolute z-50 mt-2 w-auto rounded-md border bg-white shadow-lg">
            {content}
          </div>
        )}
      </div>
    );
  };

  // Composant Calendar local simplifié
  const Calendar = ({ selected, onSelect }) => {
    const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());

    const getDaysInMonth = (month, year) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
      return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const handlePrevMonth = () => {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    };

    const handleNextMonth = () => {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    };

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div className="w-64 p-2">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          <div className="font-medium">
            {monthNames[currentMonth]} {currentYear}
          </div>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded hover:bg-gray-100"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-1">
          {days.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="h-8"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(currentYear, currentMonth, i + 1);
            const isSelected =
              selected && date.toDateString() === selected.toDateString();

            return (
              <button
                key={`day-${i}`}
                className={`h-8 w-8 rounded-full text-sm flex items-center justify-center ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : date.toDateString() === today.toDateString()
                    ? "border border-blue-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => onSelect(date)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Medical Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Pills */}
          <div className="absolute top-20 right-8 w-12 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 transform rotate-45 animate-pulse"></div>
          <div className="absolute top-32 right-16 w-8 h-4 bg-gradient-to-r from-green-400 to-orange-400 rounded-full opacity-15 transform -rotate-12"></div>
          <div className="absolute bottom-32 left-8 w-10 h-5 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full opacity-12 transform rotate-30"></div>

          {/* Molecular Particles */}
          <div className="absolute top-40 left-12 w-2 h-2 bg-blue-400/20 rounded-full"></div>
          <div className="absolute top-48 left-20 w-1.5 h-1.5 bg-green-400/25 rounded-full"></div>
          <div className="absolute bottom-40 right-20 w-2 h-2 bg-purple-400/20 rounded-full"></div>
          <div className="absolute bottom-48 right-12 w-1.5 h-1.5 bg-orange-400/25 rounded-full"></div>

          {/* Medical Icons Background */}
          <PillIcon className="absolute top-24 left-1/4 w-8 h-8 text-blue-400/5 transform rotate-12" />
          <DropletsIcon className="absolute bottom-24 right-1/4 w-6 h-6 text-green-400/8 transform -rotate-45" />
          <PlusIcon className="absolute top-1/2 left-8 w-4 h-4 text-purple-400/6" />
        </div>

        {/* Page Header */}
        <div className="relative z-10 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add Medication
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to schedule your medication
          </p>
        </div>

        {/* Form Card */}
        <Card className="relative z-10 shadow-md">
          <CardHeader>
            <CardTitle>Medication Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Medication Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Medication Name *
              </Label>
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
                <Label htmlFor="dosage" className="text-sm font-medium">
                  Dosage *
                </Label>
                <Input
                  id="dosage"
                  placeholder="Enter dosage amount"
                  value={formData.dosage}
                  onChange={(e) => handleInputChange("dosage", e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Unit</Label>
                <Select
                  value={formData.dosageUnit}
                  onValueChange={(value) =>
                    handleInputChange("dosageUnit", value)
                  }
                >
                  <SelectItem value="mg">mg</SelectItem>
                  <SelectItem value="g">g</SelectItem>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="tablets">tablets</SelectItem>
                  <SelectItem value="drops">drops</SelectItem>
                </Select>
              </div>
            </div>

            {/* Frequency and Times per Day */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Frequency *</Label>
                <Select
                  value={formData.frequency}
                  onValueChange={(value) =>
                    handleInputChange("frequency", value)
                  }
                >
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timesPerDay" className="text-sm font-medium">
                  Times per Day
                </Label>
                <Input
                  id="timesPerDay"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.timesPerDay}
                  onChange={(e) =>
                    handleInputChange(
                      "timesPerDay",
                      parseInt(e.target.value) || 1
                    )
                  }
                  className="h-12"
                />
              </div>
            </div>

            {/* Start and End Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Start Date</Label>
                <Popover
                  trigger={
                    <Button
                      variant="outline"
                      className="h-12 justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate
                        ? formData.startDate.toLocaleDateString()
                        : "Pick a date"}
                    </Button>
                  }
                  content={
                    <Calendar
                      selected={formData.startDate}
                      onSelect={(date) => handleInputChange("startDate", date)}
                    />
                  }
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  End Date (Optional)
                </Label>
                <Popover
                  trigger={
                    <Button
                      variant="outline"
                      className="h-12 justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate
                        ? formData.endDate.toLocaleDateString()
                        : "Pick a date"}
                    </Button>
                  }
                  content={
                    <Calendar
                      selected={formData.endDate}
                      onSelect={(date) => handleInputChange("endDate", date)}
                    />
                  }
                />
              </div>
            </div>

            {/* Reminder Method */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Reminder Method</Label>
              <Select
                value={formData.reminderMethod}
                onValueChange={(value) =>
                  handleInputChange("reminderMethod", value)
                }
              >
                <SelectItem value="app">App Notification</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </Select>
            </div>

            {/* Enable Reminders Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-100/30 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Enable Reminders</Label>
                <p className="text-sm text-gray-500">
                  Get notified when it's time to take your medication
                </p>
              </div>
              <Switch
                checked={formData.enableReminders}
                onCheckedChange={(checked) =>
                  handleInputChange("enableReminders", checked)
                }
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this medication..."
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <Button
                onClick={handleSave}
                className="flex-1 h-12 hover:cursor-pointer"
                size="lg"
              >
                <SaveIcon className="w-5 h-5 mr-2" />
                Save Medication
              </Button>
              <Button
                variant="outline"
                onClick={handleCancel}
                className="flex-1 h-12 hover:cursor-pointer"
                size="lg"
              >
                <XIcon className="w-5 h-5 mr-2" />
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
