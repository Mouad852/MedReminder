import React, { useState } from "react";
import Logo from "../components/LightLogo";
import { Eye, EyeOff } from "lucide-react";
import bgImage from "../assets/LoginBackground.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen text-gray-900">
      {/* Left Side - Info Section */}
      <div className="w-1/2 text-white px-12 py-8 flex flex-col justify-center relative overflow-hidden bg-[linear-gradient(to_bottom,_#0a174e,_#1b2a6b)]">
        {/* Content Wrapper */}
        <div className="z-10 space-y-10">
          {/* Logo */}
          <div>
            <Logo />
          </div>

          {/* Headline and Subtext */}
          <div>
            <h1 className="text-4xl font-extrabold leading-snug italic">
              Your Personal Medication Reminder System
            </h1>
            <p className="mt-4 text-base mb-0 font-semibold italic text-black">
              Stay on track with your medications, appointments and health,{" "}
              <span className="not-italic">all in one place.</span>
            </p>
          </div>

          {/* About Section */}
          <div className="text-sm">
            <h2 className="text-xl font-bold mb-2 text-[#d9d9ff]">About Us</h2>
            <p className="leading-relaxed">
              <span className="font-bold italic">MediReminder</span> is designed
              to help patients take their medications on time, manage health
              routines, and stay organized with minimal effort. Whether you're
              managing chronic illness or simple daily vitamins,
              <br />
              <span className="italic text-gray-400 font-bold justify-center">
                we’ve got your back.
              </span>
            </p>
          </div>
        </div>

        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>

        {/* Footer */}
        <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-200 z-10 text-center">
          © 2025 MediReminder LLC. All rights reserved.
        </footer>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-1/2 bg-white flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-2">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">
            Sign in to start your journey with MediReminder — your partner in
            staying on track.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 ">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none hover:cursor-pointer"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="text-sm text-right text-indigo-600 hover:underline cursor-pointer">
              Forgot password?
            </div>

            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-blue-950 transition"
            >
              Sign in
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
