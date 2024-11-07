// src/components/admin/Dashboard.jsx
// src/components/admin/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>

      {/* Statistics Cards */}
      <div className="stats-cards">
        <div className="card">
          <h3>Total Doctors</h3>
          <p>45</p>
        </div>
        <div className="card">
          <h3>Total Appointments</h3>
          <p>120</p>
        </div>
        <div className="card">
          <h3>Pending Approvals</h3>
          <p>3</p>
        </div>
        <div className="card">
          <h3>Patients</h3>
          <p>80</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          <li>Dr. Smith approved a new appointment.</li>
          <li>Dr. Jane Doe added a new schedule.</li>
          <li>New patient registration by John Doe.</li>
        </ul>
      </div>

      {/* Upcoming Appointments */}
      <div className="section">
        <h3>Upcoming Appointments</h3>
        <ul className="appointment-list">
          <li>10:00 AM - John Doe with Dr. Smith</li>
          <li>11:00 AM - Alice Brown with Dr. Jane Doe</li>
          <li>1:00 PM - Mark Johnson with Dr. Brian Green</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
