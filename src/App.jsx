// App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import DoctorAdminLogin from './components/DoctorAdminLogin';
import DoctorPage from './pages/DoctorPage';
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="mx-4 sm:mx-[10%]">
      {isAdminRoute ? null : <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-login" element={<DoctorAdminLogin />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/doctor/:id/*" element={<DoctorPage />} />
      </Routes>
      
      <Footer />
    </div>
  );
};

export default App;
