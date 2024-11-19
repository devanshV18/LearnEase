import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-black py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left: Social Icons aligned horizontally */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300 transition-colors">
              <FaInstagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <FaLinkedinIn size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <FiGithub size={24} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>

          {/* Center Text */}
          <div className="text-sm font-light text-center">
            Designed by <span className="font-medium">Devansh Verma</span>
          </div>

          {/* Right: Buttons aligned to the right like the Navbar's "About Us" button */}
          <div className="space-x-4 flex items-center">
            <Link
              to="/contact-us"
              className="inline-block px-4 py-2 text-sm font-medium border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/about-us"
              className="inline-block px-4 py-2 text-sm font-medium border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
