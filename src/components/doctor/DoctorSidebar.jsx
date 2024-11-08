import React from 'react';
import { NavLink , useParams } from 'react-router-dom';
import { FaTachometerAlt, FaUserMd, FaUsers } from 'react-icons/fa'; // Import icons

function DoctorSidebar() {

  const { id } = useParams(); // Get the doctor ID from the URL

  if (!id) {
      return <p>Doctor ID is missing. Please log in again.</p>; // Show a message if ID is missing
  }


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