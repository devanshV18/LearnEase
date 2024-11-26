import React, { useState, useEffect, useRef } from "react";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import registration from "../assets/registration.png";
import { MdEdit } from "react-icons/md";
import { register } from "../store/slices/UserSlice";
import Spinner from "../components/Spinner";

// Typing effect hook
const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
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

  const typedText = useTypingEffect(
    "Discover latest courses, explore tutorials, manage your notes and unlock AI-powered summarizations, all in one place! Click the Logo to Explore!",
    50
  );


  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [institutionName, setInstitutionName] = useState("")
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const {loading, isAuthenticated} = useSelector(state => state.user)
  const navigateTo = useNavigate()
  const dispatch = useDispatch()


  //registration
  const handleRegisterClick = (e) => {
    e.preventDefault();
    const formData = new FormData()

    formData.append("profileImage", profileImage)
    formData.append("userName", userName)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("role", role)
    formData.append("institutionName", institutionName)

    dispatch(register(formData))
  };

  //useeffect navigation
  useEffect(() => {
    if(isAuthenticated){
      navigateTo('/')
    }
  }, [dispatch, loading, isAuthenticated])


  //image uplaod
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setProfileImagePreview(reader.result)
      setProfileImage(file)
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left section (70%) */}
      <div className="md:w-[70%] flex flex-col items-center justify-center bg-white p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <Link to="/">LearnEase</Link>
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
          <form onSubmit={handleRegisterClick} className="space-y-4">
            <div className="flex flex-col items-center mb-4">

              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-4xl text-gray-400">
                    +
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
                aria-label="Upload profile picture"
              />
              <button
                type="button"
                onClick={handleEditClick}
                className="mt-2 px-4 py-2 font-semibold text-md"
              >
                {profileImage ? <MdEdit/> : <MdEdit />} 
              </button>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                What describes you best?
              </label>

              <select
                id="userType"
                value={role}
                onChange = {(e) => setRole(e.target.value)}
                name="userType"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              >
                <option value="">Select user type</option>
                <option value="High School Student">High School Student</option>
                <option value="Undergrad Student">Undergrad Student</option>
                <option value="PostGrad Student">PostGrad Student</option>
                <option value="Working Professional">Working Professional</option>
                <option value="Self-Employed">Self-Employed</option>
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
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Enter your institution"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <button
              type="submit"
              onClick={handleRegisterClick}
              className="w-full bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? <Spinner/> : "Register"}
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
