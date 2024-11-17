import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { Footer } from './components/Footer.jsx';
import Login from './pages/Login.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';

const App = () => {
  // Simulating login status for demonstration. Replace this with actual authentication logic.
  const isLoggedIn = true; // Replace with your login check

  return (
    <Router>
      <Routes>
        {/* Standalone pages without Navbar and Footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />

        {/* Protected layout for logged-in users */}
        <Route
          path="/*"
          element={
            isLoggedIn ? (
              <div>
                {/* Layout for authenticated users */}
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 100px)' }}>
                  {/* Adjust minHeight based on Navbar and Footer height */}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* Add more routes as needed */}
                  </Routes>
                </main>
                <Footer />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
