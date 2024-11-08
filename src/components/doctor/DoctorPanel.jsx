import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './DoctorPanel.css';

const initialAppointmentsData = [
    { id: 1, patient: 'John Doe', age: 30, dateTime: '7 Dec 2024, 05:00 PM', fees: '$900', accepted: false },
    { id: 2, patient: 'Jane Smith', age: 25, dateTime: '8 Dec 2024, 10:30 AM', fees: '$660', accepted: false },
    { id: 3, patient: 'Rocky', age: 33, dateTime: '6 Dec 2014, 05:00 PM', fees: '$160', accepted: false },
    { id: 4, patient: 'Kevin', age: 24, dateTime: '1 Dec 2021, 10:30 AM', fees: '$600', accepted: false },
    { id: 5, patient: 'Brad', age: 38, dateTime: '12 Dec 2022, 05:00 PM', fees: '$540', accepted: false },
    { id: 6, patient: 'Henry', age: 23, dateTime: '18 Dec 2015, 10:30 AM', fees: '$350', accepted: false },
    { id: 7, patient: 'Steve', age: 36, dateTime: '10 Dec 2013, 05:00 PM', fees: '$480', accepted: false },
    { id: 8, patient: 'Rohit', age: 26, dateTime: '20 Dec 2014, 10:30 AM', fees: '$790', accepted: false },
    // Add more appointments as needed
];

const DoctorPanel = () => {
    const { doctorId } = useParams();
    const [appointments, setAppointments] = useState(initialAppointmentsData);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [appointmentToReject, setAppointmentToReject] = useState(null);

    const handleAccept = (id) => {
        setAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.id === id ? { ...appointment, accepted: true } : appointment
            )
        );
    };

    const openRejectDialog = (id) => {
        setAppointmentToReject(id);
        setShowConfirmDialog(true);
    };

    const closeRejectDialog = () => {
        setShowConfirmDialog(false);
        setAppointmentToReject(null);
    };

    const confirmReject = () => {
        setAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== appointmentToReject)
        );
        closeRejectDialog();
    };

    const acceptedAppointments = appointments.filter(appointment => appointment.accepted);
    const totalPatients = acceptedAppointments.length;

    return (
        <div className="doctor-panel">
            <header className="doctor-panel-header">
                <h1>Doctor Panel</h1>
                <p>Welcome, {doctorId}</p>
            </header>
            <div className="stats-card">
                <h2><b>Accepted Appointments</b></h2>
                <span>{totalPatients}</span>
            </div>
            <h2 className="table-heading"><b>Pending Appointments</b></h2>
            <br />
            <table className="appointments-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Patient</th>
                        <th>Age</th>
                        <th>Date & Time</th>
                        <th>Fees</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments
                        .filter(appointment => !appointment.accepted)
                        .map((appointment, index) => (
                            <tr key={appointment.id}>
                                <td>{index + 1}</td>
                                <td>{appointment.patient}</td>
                                <td>{appointment.age}</td>
                                <td>{appointment.dateTime}</td>
                                <td>{appointment.fees}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="accept-button"
                                            onClick={() => handleAccept(appointment.id)}
                                        >
                                            ✓
                                        </button>
                                        <button
                                            className="reject-button"
                                            onClick={() => openRejectDialog(appointment.id)}
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <h2 className="table-heading"><b>Accepted Queue</b></h2>
            <br />
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
                    {acceptedAppointments.map((appointment, index) => (
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

            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="confirm-dialog-overlay">
                    <div className="confirm-dialog">
                        <p>Do you want to reject this patient?</p>
                        <div className="dialog-buttons">
                            <button className="dialog-button-yes" onClick={confirmReject}>
                                Yes
                            </button>
                            <button className="dialog-button-no" onClick={closeRejectDialog}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorPanel;
