import React from 'react';
import { useParams } from 'react-router-dom';
import './DoctorPanel.css';

const appointmentsData = [
    { id: 1, patient: 'John Doe', age: 30, dateTime: '7 Dec 2024, 05:00 PM', fees: '$60' },
    { id: 2, patient: 'Jane Smith', age: 25, dateTime: '8 Dec 2024, 10:30 AM', fees: '$60' },
    // Add more appointments as needed
];

const DoctorPanel = () => {
    const { doctorId } = useParams();
    const totalPatients = appointmentsData.length;

    return (
        <div className="doctor-panel">
            <header className="doctor-panel-header">
                <h1>Doctor Panel</h1>
                <p>Welcome, {doctorId}</p>
            </header>
            <div className="stats-card">
                <h2>Total Patients</h2>
                <span>{totalPatients}</span>
            </div>
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Patient</th>
                        <th>Age</th>
                        <th>Date & Time</th>
                        <th>Fees</th>
                    </tr>
                </thead>
                <tbody>
                    {appointmentsData.map((appointment, index) => (
                        <tr key={appointment.id}>
                            <td>{index + 1}</td>
                            <td>{appointment.patient}</td>
                            <td>{appointment.age}</td>
                            <td>{appointment.dateTime}</td>
                            <td>{appointment.fees}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DoctorPanel;
