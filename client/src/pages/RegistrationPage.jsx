import React, { useState, useEffect } from "react";
import registration from "../assets/registration.png";
import { Link } from "react-router-dom";

// Typing effect hook
const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1)); // Correctly slice text up to the current index
      i++;
      if (i >= text.length) {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayedText;
};

const RegistrationPage = () => {
  const [userType, setUserType] = useState("");

  const typedText = useTypingEffect(
    "Discover latest courses, explore tutorials, manage your notes and unlock AI-powered summarizations, all in one place!",
  50
);


  const handleRegisterClick = (e) => {
    e.preventDefault();
    console.log("Register button clicked");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    console.log("Login button clicked");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left section (70%) */}
      <div className="md:w-[70%] flex flex-col items-center justify-center bg-white p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="text-black">Learn</span>
          <span className="text-black">Ease</span>
          <sup className="text-xs text-black">TM</sup>
        </h1>
        <p className="text-lg md:text-xl font-bold text-[#c68E17] text-center max-w-lg mb-8">
          {typedText}
        </p>
        <img
          src={registration}
          alt="LearnEase Platform"
          className="w-64 h-40 md:w-96 md:h-72 object-contain"
        />
      </div>

      {/* Right section (30%) */}
      <div className="md:w-[30%] flex items-center justify-center bg-white p-4 mr-3">
        <div className="w-full max-w-md p-6">
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            Register Now
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              >
                <option value="">Select user type</option>
                <option value="college">College Student</option>
                <option value="school">School Student</option>
                <option value="professional">Working Professional</option>
              </select>
            </div>
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                Institution Name
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                placeholder="Enter your institution"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <button
              type="button"
              onClick={handleRegisterClick}
              className="w-full bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <p className="text-center text-black mt-4">Already have an account?</p>
            <Link
              to="/login"
              className="w-full bg-black text-white font-bold py-2 px-4 rounded inline-block text-center mt-2 focus:outline-none focus:shadow-outline"
            >
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
