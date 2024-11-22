import { Link } from 'react-router-dom'
import { useState } from 'react'
import ProfileCard from './ProfileCard.jsx'

export default function Navbar() {
  const user = true
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfileCard, setShowProfileCard] = useState(false)

  //logout Handler
  const logoutHandler = () => {
    // Implement logout logic here
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-black text-xl font-bold">
              LearnEase<sup className="text-xs">™</sup>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-4">
            {user && (
              <>
                <Link to="/upload-notes" className="text-black hover:text-gray-700">
                  Upload Notes
                </Link>
                <Link to="/my-notes" className="text-black hover:text-gray-700">
                  My Notes
                </Link>
                <div 
                  className="text-black hover:text-gray-700 cursor-pointer relative"
                  onMouseEnter={() => setShowProfileCard(true)}
                  onMouseLeave={() => setShowProfileCard(false)}
                >
                  Profile
                  {showProfileCard && (
                    <div className="absolute right-0 mt-2 z-10">
                      <ProfileCard />
                    </div>
                  )}
                </div>
              </>
            )}
            <Link to="/tutorials" className="text-black hover:text-gray-700">
              Tutorials
            </Link>
            {user ? (
              <button onClick={logoutHandler} className="text-black hover:text-gray-700 bg-transparent border-none cursor-pointer">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-black hover:text-gray-700">
                  Login
                </Link>
                <Link to="/register" className="text-black hover:text-gray-700">
                  Register
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black hover:text-gray-700" 
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {user && (
            <>
              <Link to="/upload-notes" className="block text-black hover:text-gray-700 px-3 py-2">
                Upload Notes
              </Link>
              <Link to="/my-notes" className="block text-black hover:text-gray-700 px-3 py-2">
                My Notes
              </Link>
              <div 
                className="block text-black hover:text-gray-700 px-3 py-2 cursor-pointer relative"
                onClick={() => setShowProfileCard(!showProfileCard)}
              >
                Profile
                {showProfileCard && (
                  <div className="absolute left-0 mt-2 z-10">
                    <ProfileCard />
                  </div>
                )}
              </div>
            </>
          )}
          <Link to="/tutorials" className="block text-black hover:text-gray-700 px-3 py-2">
            Tutorials
          </Link>
          {user ? (
            <button onClick={logoutHandler} className="block text-black hover:text-gray-700 px-3 py-2 w-full text-left bg-transparent border-none cursor-pointer">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="block text-black hover:text-gray-700 px-3 py-2">
                Login
              </Link>
              <Link to="/register" className="block text-black hover:text-gray-700 px-3 py-2">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

