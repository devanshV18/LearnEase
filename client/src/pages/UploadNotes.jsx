import React, { useState } from 'react';
import MyNotes from './MyNotes.jsx';
import { Link } from 'react-router-dom';

export default function UploadNotes() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle file upload logic here
    console.log('Uploading:', { title, description, file });
  };

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="ml-5 text-xl font-bold">LearnEase<sup>TM</sup></Link>  
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - Upload form */}
          <div className="w-full lg:w-1/3">
            <h1 className="text-2xl font-semibold mb-8 text-center">Upload Notes</h1>
            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-md mt-4">
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="pdf" className="block text-sm font-medium mb-1">
                  Upload PDF
                </label>
                <input
                  type="file"
                  id="pdf"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-1/3 font-semibold bg-white text-black py-2 px-4 rounded-md hover:bg-black hover:text-white"
              >
                Upload PDF
              </button>
            </form>
          </div>

          {/* Right side - MyNotes component */}
          <div className="w-full lg:w-2/3">
            <MyNotes />
          </div>
        </div>
      </div>
    </div>
  );
}