// DoctorPage.jsx
import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import DoctorSidebar from '../components/doctor/DoctorSidebar';
import DoctorPanel from '../components/doctor/DoctorPanel';
import DoctorProfileForm from '../components/doctor/DoctorProfileForm';

function DoctorPage() {
    const { id } = useParams(); // Get the doctor ID from the URL

    if (!id) {
        return <p>Doctor ID is missing. Please log in again.</p>;
    }

    return (
        <div className="doctor-dashboard">
            <AdminHeader />
            <DoctorSidebar />
            <div className="doctor-content">
                <Routes>
                    <Route path="appointments" element={<DoctorPanel />} />
                    <Route path="profile" element={<DoctorProfileForm />} />
                </Routes>
            </div>
        </div>
    );
}

export default DoctorPage;
