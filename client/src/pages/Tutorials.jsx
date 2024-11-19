import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Tutorials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const apiKey = "AIzaSyDciLmFC9UsMUo7KLRleHpdkiecMEB3EQg"; // Replace with your API key
    const maxResults = 20;
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&maxResults=${maxResults}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const videoDetails = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        publishedAt: new Date(item.snippet.publishedAt).toDateString(),
      }));

      setVideos(videoDetails);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos();
  };

  return (
    <div className="bg-white text-black min-h-screen p-6">
      {/* Heading */}
      <Link to="/" className="ml-5 text-xl font-bold">LearnEase<sup>TM</sup></Link>
      <h1 className="text-center text-3xl md:text-5xl font-bold tracking-tight mt-12 mb-8 leading-tight">
        What's up for Learning Today? <br /> 
        <span className="text-2xl md:text-4xl font-semibold text-gray-700">Explore tutorials right here.</span>
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center items-center mb-12">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search by Videos"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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

      {/* Video Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transition-all hover:shadow-lg"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2 hover:underline">
                {video.title}
              </h2>
              <p className="text-sm text-gray-600 mb-1">{video.channel}</p>
              <p className="text-xs text-gray-500 mb-3">{video.publishedAt}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-2 bg-black text-white rounded-full text-center hover:bg-gray-800 transition-all"
              >
                Watch Tutorial
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}