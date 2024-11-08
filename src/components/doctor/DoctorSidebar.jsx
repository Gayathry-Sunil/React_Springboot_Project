import React from 'react';
import { NavLink , useParams } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUsers } from 'react-icons/fa'; // Import icons

function DoctorSidebar() {

    const { id } = useParams(); // Get doctor ID from URL parameters

  return (
    <div className="sidebar">
      <NavLink to={`/doctor/${id}/appointments`} className="sidebar-link">
          <FaTachometerAlt className="sidebar-icon" /> Appointments
        </NavLink>
        <NavLink to={`/doctor/${id}/profile`} className="sidebar-link">
          <FaUserMd className="sidebar-icon" /> Profile
        </NavLink>
    </div>
  );
}

export default DoctorSidebar;