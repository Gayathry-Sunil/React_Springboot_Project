import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUsers } from 'react-icons/fa'; // Import icons

function Sidebar() {
  return (
    <div className="sidebar">
      {/* <NavLink to="/admin/dashboard" className="sidebar-link">
        <FaTachometerAlt className="sidebar-icon" /> Dashboard
      </NavLink> */}
      <NavLink to="/admin/add-doctor" className="sidebar-link">
        <FaUserMd className="sidebar-icon" /> Add Doctor
      </NavLink>
      <NavLink to="/admin/doctors-list" className="sidebar-link">
        <FaUsers className="sidebar-icon" /> Doctors List
      </NavLink>
    </div>
  );
}

export default Sidebar;
