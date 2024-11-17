import React from 'react'
// import { Instagram, Linkedin, Github } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            {/* <a href="#" className="hover:text-gray-300 transition-colors">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a> */}
          </div>

          {/* Center Text */}
          <div className="text-sm font-light">
            Designed by <span className="font-medium">Devansh Verma</span>
          </div>

          {/* Buttons */}
          <div className="space-x-4">
            <a
              href="#"
              className="inline-block px-4 py-2 text-sm font-medium border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="inline-block px-4 py-2 text-sm font-medium border border-white rounded-full hover:bg-white hover:text-black transition-colors"
            >
              About Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}