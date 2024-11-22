import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="p-4 shadow-sm">
        <Link to="/" className="text-2xl font-bold">
          LearnEase<sup className="text-xs">™</sup>
        </Link>
      </nav>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">About LearnEase</h1>
        <p className="mb-6 text-lg">
          LearnEase is your ultimate study companion, designed to enhance your learning experience and boost your productivity.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="mb-4">
              At LearnEase, we're committed to empowering students and lifelong learners with innovative tools that simplify the learning process and make education more accessible and efficient.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Secure note-saving functionality</li>
              <li>Extensive library of tutorials and courses</li>
              <li>AI-powered PDF summarization tool</li>
              <li>User-friendly interface for seamless learning</li>
            </ul>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Why Choose LearnEase?</h2>
          <p className="mb-4">
            LearnEase combines the power of organized note-taking, curated learning resources, and cutting-edge AI technology to create a comprehensive learning platform. Whether you're a student preparing for exams or a professional expanding your knowledge, LearnEase is designed to adapt to your unique learning style and needs.
          </p>
        </div>
        <div className="mt-12 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Get Started Today</h2>
          <p className="mb-4">
            Join thousands of learners who have already discovered the power of LearnEase. Start your journey towards more effective and enjoyable learning now!
          </p>
          <Link to="/register" className="inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
            Sign Up for Free
          </Link>
        </div>
      </main>
    </div>
  );
};

export default About;

