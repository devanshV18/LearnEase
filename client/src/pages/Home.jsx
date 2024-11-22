import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const apiKey = "AIzaSyCV_WeXbcUHprPdS_1GmAIKoHxEWKMVIrA";
      const endpoint = `https://kgsearch.googleapis.com/v1/entities:search?query=${encodeURIComponent(
        query
      )}&key=${apiKey}&limit=10`;

      const response = await fetch(endpoint);
      const data = await response.json();

      // Filter and process results to include name, description, thumbnail, and URL
      const filteredResults = data.itemListElement.map((item) => ({
        id: item.result.id,
        name: item.result.name,
        description: item.result.description || "No description available",
        thumbnail:
          item.result.image?.contentUrl ||
          "https://via.placeholder.com/150?text=No+Image",
        url: item.result.url || "#", // Default to '#' if no URL is available
      }));

      setResults(filteredResults);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    fetchCourses(query);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div>
          <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight mt-12 mb-8 leading-tight">
            Online Certification Courses across the web, All at one place. <br />
            <span className="text-2xl md:text-4xl font-semibold text-gray-700">
              Search, Pick and Upskill!
            </span>
          </h1>

          <form
            className="flex justify-center items-center mb-12"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search to explore courses"
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full py-3 px-4 pr-12 text-black bg-gray-100 placeholder-gray-500 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              >
                <FaMagnifyingGlass className="h-6 w-6" />
              </button>
            </div>
          </form>

          {loading && (
            <p className="text-center text-gray-500">Loading courses...</p>
          )}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div
                key={result.id}
                className="p-4 bg-white rounded shadow-md border border-gray-200 flex flex-col"
              >
                <img
                  src={result.thumbnail}
                  alt={result.name}
                  className="w-16 h-16 rounded mb-4"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-black mb-2">
                    {result.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {result.description}
                  </p>
                </div>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 underline text-sm"
                >
                  Go to Course
                </a>
              </div>
            ))}
            {results.length === 0 && !loading && (
              <p className="text-center text-gray-500">
                No results found. Try a different search.
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
