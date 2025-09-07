import React, { useState, useEffect } from "react";
import { getUserById, updateUser } from "../services/userService";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Pencil, Plus } from "lucide-react";

const Profile = () => {
  const storedUser = localStorage.getItem("user");
  const userId = storedUser ? JSON.parse(storedUser).id : null;

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
    address: "",
    city: "",
    country: "",
    notifications: { email: false, sms: false, push: false },
  });

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(userId);
        setUserData({
          ...data,
          notifications: data.notifications || {
            email: false,
            sms: false,
            push: false,
          },
        });
        console.log("User Data in the Backend: ", userData);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...userData };

      // convert "" -> null for all fields
      Object.keys(payload).forEach((key) => {
        if (payload[key] === "") {
          payload[key] = null;
        }
      });

      console.log("UserData: ", userData);

      const updated = await updateUser(userId, payload);

      // Ensure all fields are defined for controlled inputs
      setUserData({
        firstName: updated.firstName ?? "",
        lastName: updated.lastName ?? "",
        email: updated.email ?? "",
        phone: updated.phone ?? "",
        gender: updated.gender ?? "",
        birthDate: updated.birthDate ?? "",
        address: updated.address ?? "",
        city: updated.city ?? "",
        country: updated.country ?? "",
        notifications: updated.notifications ?? {
          email: false,
          sms: false,
          push: false,
        },
      });

      setEditMode(false);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <Header />

      <div className="flex justify-center p-8 flex-1">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-40 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-100 rounded-full blur-3xl opacity-40 -z-10"></div>

          {/* Header & Edit Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Account Info</h2>
            <button
              onClick={() => setEditMode(!editMode)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition hover:cursor-pointer"
            >
              <Pencil size={18} className="mr-1 hover:cursor-pointer" />
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div className="flex flex-col md:flex-row gap-4">
              {["firstName", "lastName"].map((field) => (
                <div className="flex-1" key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={userData[field] ?? ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-3 py-2 border rounded-lg text-sm shadow-sm transition ${
                      editMode
                        ? "border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                        : "border-gray-200 bg-gray-100"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Email & Phone */}
            <div className="flex flex-col md:flex-row gap-4">
              {[
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
              ].map(({ label, name, type }) => (
                <div className="flex-1" key={name}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={userData[name]}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-3 py-2 border rounded-lg text-sm shadow-sm transition ${
                      editMode
                        ? "border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                        : "border-gray-200 bg-gray-100"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Gender & Birth Date */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-3 py-2 border rounded-lg text-sm shadow-sm transition ${
                    editMode
                      ? "border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                      : "border-gray-200 bg-gray-100"
                  }`}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Birth Date
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={
                    userData.birthDate ? userData.birthDate.split("T")[0] : ""
                  }
                  onChange={handleChange}
                  disabled={!editMode}
                  className={`w-full px-3 py-2 border rounded-lg text-sm shadow-sm transition ${
                    editMode
                      ? "border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                      : "border-gray-200 bg-gray-100"
                  }`}
                />
              </div>
            </div>

            {/* Address, City, Country */}
            <div className="flex flex-col md:flex-row gap-4">
              {["address", "city"].map((field) => (
                <div className="flex-1" key={field}>
                  <label className="block text-sm font-medium mb-1 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={userData[field] ?? ""}
                    onChange={handleChange}
                    disabled={!editMode}
                    className={`w-full px-3 py-2 border rounded-lg text-sm shadow-sm transition ${
                      editMode
                        ? "border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                        : "border-gray-200 bg-gray-100"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={userData.country ?? ""}
                onChange={handleChange}
                disabled={!editMode}
                className={`w-full px-3 py-2 border rounded-lg text-sm shadow-sm transition ${
                  editMode
                    ? "border-indigo-400 focus:ring-2 focus:ring-indigo-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Notification Preferences */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Notification Preferences
              </label>
              <div className="space-y-3">
                {["email", "sms", "push"].map((type) => (
                  <div
                    key={type}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
                  >
                    <span className="font-medium text-gray-700">
                      {type.toUpperCase()}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userData.notifications[type]}
                        disabled={!editMode}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            notifications: {
                              ...prev.notifications,
                              [type]: e.target.checked,
                            },
                          }))
                        }
                        className="sr-only peer"
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer 
                        peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] 
                        after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        peer-checked:bg-indigo-600"
                      ></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Save Button */}
            {editMode && (
              <button
                onClick={handleSave}
                className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition hover:cursor-pointer"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
