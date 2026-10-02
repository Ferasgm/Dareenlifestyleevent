import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contact from './Contact';
import AboutUs from './AboutUs';
import Header from './includes/Header';
import Footer from './includes/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </main>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

      <Footer />
    </Router>
  );
}

export default App;