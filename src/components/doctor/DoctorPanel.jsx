import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import "./DoctorPanel.css";
import {
  getDoctorAppointments,
  updateBookingStatus,
  getDoctorById
} from "../../services/AllAPIs";

import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

const DoctorPanel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctorName, setDoctorName] = useState("");
  const { setToken } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [appointmentToReject, setAppointmentToReject] = useState(null);
  const [appointmentToAccept, setAppointmentToAccept] = useState(null);

  useEffect(() => {
    fetchDoctorDetails();
    fetchAppointments();
  }, [id]);

  useEffect(() => {
    // Check if admin is in sessionStorage
    const storedUser = sessionStorage.getItem('doctor');
    const initialUserData = storedUser ? JSON.parse(storedUser) : null;

    if (initialUserData === null) {
      setToken(false); // No admin found, set token to false
      navigate('/login'); // Optionally, redirect to login page
    } else {
      setToken(true); // Admin found, set token to true
      
    }
  }, [setToken, navigate]);

  const fetchDoctorDetails = async () => {
    try {
        const response = await getDoctorById(id);
        // const data = await response.json();
        // console.log(response);
        // Handle the fetched data
        setDoctorName(response.doctorName);
    } catch (error) {
        console.error('Error fetching doctor details:', error);
    }
};

  const fetchAppointments = async () => {
    try {
      const data = await getDoctorAppointments(id);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      fetchAppointments(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const openRejectDialog = (bookingId) => {
    setAppointmentToReject(bookingId);
    setShowRejectDialog(true);
  };

  const closeRejectDialog = () => {
    setShowRejectDialog(false);
    setAppointmentToReject(null);
  };

  const confirmReject = () => {
    if (appointmentToReject) {
      handleStatusUpdate(appointmentToReject, "REJECTED");
    }
    closeRejectDialog();
  };

  const openAcceptDialog = (bookingId) => {
    setAppointmentToAccept(bookingId);
    setShowAcceptDialog(true);
  };

  const closeAcceptDialog = () => {
    setShowAcceptDialog(false);
    setAppointmentToAccept(null);
  };

  const confirmAccept = () => {
    if (appointmentToAccept) {
      handleStatusUpdate(appointmentToAccept, "ACCEPTED");
    }
    closeAcceptDialog();
  };

  const acceptedAppointments = appointments.filter(
    (appointment) => appointment.status === "ACCEPTED"
  );

  const pendingAppointments = appointments.filter(
    (appointment) => !appointment.status || appointment.status === "Pending"
  );

  const rejectedAppointments = appointments.filter(
    (appointment) => appointment.status === "REJECTED"
  );

  return (
    <div className="doctor-panel">
      <header className="doctor-panel-header">
        <h1>Doctor Panel</h1>
        <p>Welcome {doctorName}</p>
      </header>

      <div className="stats-card">
        <h2>Accepted Appointments</h2>
        <span>{acceptedAppointments.length}</span>
      </div>

      <h2 className="table-heading">Pending Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Patient Email</th>
            <th>Patient DOB</th>
            <th>Patient Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pendingAppointments.length > 0 ? (
            pendingAppointments.map((appointment) => (
              <tr key={appointment.bookingId}>
                <td>{appointment.bookingId}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.patientEmail}</td>
                <td>{appointment.patientDob}</td>
                <td>{appointment.patientPhone}</td>
                <td>{appointment.status || "Pending"}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="accept-button"
                      onClick={() => openAcceptDialog(appointment.bookingId)}
                    >
                      ✓
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => openRejectDialog(appointment.bookingId)}
                    >
                      ✕
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-data">
                No pending appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="table-heading">Accepted Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Patient Email</th>
            <th>Patient DOB</th>
            <th>Patient Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {acceptedAppointments.length > 0 ? (
            acceptedAppointments.map((appointment) => (
              <tr key={appointment.bookingId}>
                <td>{appointment.bookingId}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.patientEmail}</td>
                <td>{appointment.patientDob}</td>
                <td>{appointment.patientPhone}</td>
                <td className="status-accepted">{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No accepted appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h2 className="table-heading">Rejected Appointments</h2>
      <table className="appointments-table">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Patient Name</th>
            <th>Patient Email</th>
            <th>Patient DOB</th>
            <th>Patient Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rejectedAppointments.length > 0 ? (
            rejectedAppointments.map((appointment) => (
              <tr key={appointment.bookingId}>
                <td>{appointment.bookingId}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.patientEmail}</td>
                <td>{appointment.patientDob}</td>
                <td>{appointment.patientPhone}</td>
                <td className="status-rejected">{appointment.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">
                No rejected appointments found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Dialog for Rejection */}
      {showRejectDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <p>Are you sure you want to reject this appointment?</p>
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

      {/* Confirmation Dialog for Acceptance */}
      {showAcceptDialog && (
        <div className="confirm-dialog-overlay">
          <div className="confirm-dialog">
            <p>Are you sure you want to accept the appointment for {appointmentToAccept?.patientName}?</p>
            <div className="dialog-buttons">
              <button className="dialog-button-yes" onClick={confirmAccept}>
                Yes
              </button>
              <button className="dialog-button-no" onClick={closeAcceptDialog}>
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
