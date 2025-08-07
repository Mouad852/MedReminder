import Logo from "../components/LightLogo";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
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
              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-left text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1e2740] bg-white"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-left text-gray-800"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your Password"
                  value={formData.confirmPassword}
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
