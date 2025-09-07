import Logo from "../components/LightLogo";
import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../services/authService";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDate: "",
    city: "",
    phone: "",
  });

  const cities = [
    "Casablanca",
    "Marrakech",
    "Rabat",
    "Fes",
    "Tangier",
    "Agadir",
    "Meknes",
    "Oujda",
    "Kenitra",
    "Tetouan",
    "Safi",
    "El Jadida",
    "Nador",
    "Beni Mellal",
    "Taza",
    "Mohammedia",
    "Khouribga",
    "Settat",
    "Larache",
    "Salé",
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.city) {
      toast.error("City is required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await register(dataToSend);
      console.log("Registration successful:", response);
      toast.success("Registration successful! Please login.");
      window.location.href = "/";
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      toast.error("Registration failed. Check your inputs.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#0f2255] px-4">
      <div className="py-8">
        <Logo />
      </div>

      <div className="bg-[#cfe8fc] rounded-lg shadow-md p-10 w-full max-w-3xl text-center mb-10">
        <div className="text-center">
          <h2 className="font-bold text-xl pb-6">Create your account</h2>
          <form onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-left text-gray-800"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-left text-gray-800"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-left text-gray-800"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white"
              />
            </div>

            {/* Password and Confirm Password */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
              <div className="w-full relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-left text-gray-800"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white pr-10"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <div className="w-full relative">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-left text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white pr-10"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-10 cursor-pointer text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            {/* City and Phone */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
              {/* City (Required) */}
              <div className="w-full">
                <label
                  htmlFor="city"
                  className="block mb-2 text-left text-gray-800 "
                >
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white hover:cursor-pointer"
                >
                  <option value="">-- Select a city --</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Phone */}
              <div className="w-full">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-left text-gray-800"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white"
                />
              </div>
            </div>

            {/* Gender and Birth Date */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
              <div className="w-full">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-left text-gray-800"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white"
                >
                  <option value="">Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="w-full">
                <label
                  htmlFor="birthDate"
                  className="block mb-2 text-left text-gray-800"
                >
                  Birth Date
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  placeholder="mm/dd/yyyy"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white"
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="mt-6 bg-blue-800 hover:bg-blue-950 text-white px-6 py-2 rounded text-base font-medium w-[60%] max-w-[500px] cursor-pointer transition"
            >
              Sign Up
            </button>

            {/* Already have an account? */}
            <p className="mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[#1e2740] underline hover:text-[#151c30]"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
