
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import DoctorSidebar from '../components/doctor/DoctorSidebar';
import DoctorPanel from '../components/doctor/DoctorPanel';
import DoctorProfileForm from '../components/doctor/DoctorProfileForm';
import './DoctorPage.css';

function DoctorPage() {
    return (
        <div className="doctor-dashboard" style={{ marginTop: "-13px" }}>
            <AdminHeader />  {/* Add AdminHeader here once */}
            <DoctorSidebar />       {/* Sidebar specific to the Doctor's panel */}
            <div className="doctor-content" style={{MarginTop: "-500rem"}}>
                <Routes>
                    {/* Match the routes to the sidebar links */}
                    <Route path=":id/appointments" element={<DoctorPanel />} />
                    <Route path=":id/profile" element={<DoctorProfileForm />} />
                </Routes>
            </div>
        </div>
    );
}

export default DoctorPage;
