import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddDoctorForm from '../components/admin/AddDoctorForm';
import DoctorList from '../components/admin/DoctorList';
// import Dashboard from '../components/admin//Dashboard';
import AdminHeader from '../components/admin/AdminHeader'; 

function Admin() {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <Sidebar />
      <div className="admin-content">
        <Routes>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="add-doctor" element={<AddDoctorForm />} />
          <Route path="doctors-list" element={<DoctorList />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default Admin;
