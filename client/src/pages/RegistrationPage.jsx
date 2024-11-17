import React, { useState, useEffect } from 'react';
import regIllustration from "../assets/regIllustration.png"

const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
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
  const [userType, setUserType] = useState('');
  const typedText = useTypingEffect("Your ultimate learning companion for students and professionals. Join us today and embark on a journey of effortless learning and growth.", 50);

  return (
    <div className="flex min-h-screen">
      {/* Left section (70%) */}
      <div className="w-[70%] bg-stone-200 flex flex-col items-center p-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-black">Learn</span>
          <span className="text-blue-600">Ease</span>
          <sup className="text-xs text-black">TM</sup>
        </h1>
        <p className="text-xl font-bold text-black text-center max-w-2xl mb-8 h-20">
          {typedText}
        </p>
        <div className="flex-grow flex items-center justify-center">
          <img
            src={regIllustration}
            alt="LearnEase Platform"
            className="w-[800px] h-[500px]"
          />
        </div>
      </div>

      {/* Right section (30%) - Registration form */}
      <div className="w-[30%] bg-white flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center text-black mb-6">
            Register Now
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select user type</option>
                <option value="college">College Student</option>
                <option value="school">School Student</option>
                <option value="professional">Working Professional</option>
              </select>
            </div>
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution Name</label>
              <input
                type="text"
                id="institution"
                name="institution"
                placeholder="Enter your institution"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;