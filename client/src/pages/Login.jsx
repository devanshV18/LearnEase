import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { login } from '../store/slices/UserSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {isAuthenticated, loading} = useSelector((state) => state.user)
  const navigateTo = useNavigate()
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData()

    formData.append("email", email)
    formData.append("password", password)

    dispatch(login(formData))
    
  };

  useEffect(() => {
    if(isAuthenticated){
      navigateTo('/')
    }
  }, [isAuthenticated, dispatch, loading])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center text-black mb-8 px-4">
        Welcome Back to LearnEase: Your Gateway to Effortless Learning!
      </h1>
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <span className="text-3xl font-medium text-black">
              LearnEase<sup className="text-xs">TM</sup>
            </span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full bg-white text-black py-2 px-4 rounded-md hover:bg-black hover:text-white"
              >
                Login
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-black">Don't have an account?</span>
            <Link to="/register" className="font-semibold text-black underline hover:text-gray-600 transition-colors">
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login