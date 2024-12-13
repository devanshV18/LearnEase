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
    "Your one stop Learning Companion. Explore Tutorials, curate mind maps, schedule your tasks, generate stats for your data and save your notes and summarize them anytime using AI.",
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
    setUserName("")
    setEmail("")
    setPassword("")
    setInstitutionName("")
    setProfileImage("")
    setRole("")
    setProfileImagePreview("")
  };

  //useeffect navigation
  useEffect(() => {
    if(isAuthenticated){
      navigateTo('/')
    }
  }, [isAuthenticated])


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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Left section (70%) */}
      <div className="md:w-[70%] flex flex-col items-center justify-center bg-white p-4 md:p-8 overflow-y-auto">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-center">
          <Link to="/">LearnEase</Link>
          <sup className="text-xs text-black">TM</sup>
        </h1>
        <p className="text-sm md:text-base lg:text-lg font-bold text-[#c68E17] text-center max-w-lg mb-4 md:mb-6">
          {typedText}
        </p>
        <img
          src={registration}
          alt="LearnEase Platform"
          className="w-48 h-32 md:w-64 md:h-40 lg:w-80 lg:h-56 object-contain"
        />
      </div>

      {/* Right section (30%) */}
      <div className="md:w-[30%] flex items-center justify-center bg-white p-4 h-screen">
        <div className="w-full max-w-md p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-center text-black mb-4">
            Register Now
          </h2>
          <form onSubmit={handleRegisterClick} className="space-y-2 md:space-y-4">
            <div className="flex flex-col items-center mb-2 md:mb-4">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-gray-200">
                {profileImagePreview ? (
                  <img
                    src={profileImagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-2xl md:text-4xl text-gray-400">
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
                className="mt-1 md:mt-2 px-2 py-1 md:px-4 md:py-2 font-semibold text-sm md:text-md"
              >
                {profileImage ? <MdEdit/> : <MdEdit />} 
              </button>
            </div>
            <div>
              <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                id="name"
                name="name"
                placeholder="John Doe"
                className="mt-1 block w-full px-2 py-1 md:px-3 md:py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                placeholder="john@example.com"
                className="mt-1 block w-full px-2 py-1 md:px-3 md:py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs md:text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                autoComplete="new-password"
                className="mt-1 block w-full px-2 py-1 md:px-3 md:py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              />
            </div>
            <div>
              <label htmlFor="userType" className="block text-xs md:text-sm font-medium text-gray-700">
                What describes you best?
              </label>
              <select
                id="userType"
                value={role}
                onChange = {(e) => setRole(e.target.value)}
                name="userType"
                className="mt-1 block w-full px-2 py-1 md:px-3 md:py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
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
              <label htmlFor="institution" className="block text-xs md:text-sm font-medium text-gray-700">
                Institution Name
              </label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Enter your institution"
                className="mt-1 block w-full px-2 py-1 md:px-3 md:py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black text-sm"
              />
            </div>
            <button
              type="submit"
              onClick={handleRegisterClick}
              className="w-full bg-black text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded focus:outline-none focus:shadow-outline text-sm"
            >
              {loading ? <Spinner/> : "Register"}
            </button>
            <p className="text-center text-black mt-2 md:mt-4 text-xs md:text-sm">Already have an account?</p>
            <Link
              to="/login"
              className="w-full bg-black text-white font-bold py-1 md:py-2 px-2 md:px-4 rounded inline-block text-center mt-1 md:mt-2 focus:outline-none focus:shadow-outline text-sm"
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

