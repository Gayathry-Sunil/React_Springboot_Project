import React, { useState, useContext } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const AdminHeader = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  
  // Use context to get token and setToken function from AppContext
  const { token, setToken } = useContext(AppContext);  // Access token and setToken from context

  const handleLogout = () => {
    sessionStorage.clear();  // Clear session storage
    setToken(false);  // Update token to false in context
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="flex items-center justify-between py-4 px-8 bg-white shadow-md fixed w-full top-0 left-0 z-50">
      {/* Logo */}
      <img onClick={() => navigate('/')} className="w-44 cursor-pointer" src={assets.logo} alt="Logo" />

      {/* Desktop Navbar Links */}
      <ul className="hidden md:flex items-center gap-8 font-medium">
        {/* Add other navbar links here if needed */}
      </ul>

      <div className="flex items-center gap-4">
        {/* Token check for logged-in state */}
        {token ? (
          <button onClick={handleLogout} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">
            Logout
          </button>
        ) : (
          <button onClick={() => navigate('/login')} className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block">
            Login
          </button>
        )}

        {/* Mobile menu toggle */}
        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="Menu" />
      </div>

      {/* Mobile Menu */}
      <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
        <div className="flex items-center justify-between px-5 py-6">
          <img className="w-22" src={assets.logo} alt="Logo" />
          <img className="w-7" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="Close" />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          {/* Only Logout for mobile */}
          {token ? (
            <button onClick={handleLogout} className="px-4 py-2 rounded-full inline-block">Logout</button>
          ) : (
            <button onClick={() => navigate('/login')} className="px-4 py-2 rounded-full inline-block">Login</button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
