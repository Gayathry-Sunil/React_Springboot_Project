import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { fetchAppointments, deleteAppointment, handleCancelledBooking, fetchCancelled } from '../services/AllAPIs';

const MyAppointments = () => {
    const { doctors } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [cancelledAppointments, setCancelledAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const fetchAppointment = async (id) => {
        setLoading(true);
        try {
            const appointmentData = await fetchAppointments(id);
            setAppointments(appointmentData);
            console.log(appointmentData);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch appointments.");
            setLoading(false);
        }
    };

    const fetchCancelledAppointment = async (id) => {
        setLoading(true);
        try {
            const cancelledAppointmentData = await fetchCancelled(id);
            setCancelledAppointments(cancelledAppointmentData);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch cancelled appointments.");
            setLoading(false);
        }
    };

    const handleDelete = async (id, appointment) => {
        const confirmDelete = window.confirm(`Do you want to cancel the appointment?`);

        if (confirmDelete) {
            try {
                const bookingDetails = {
                    patientId: user.id,
                    date: appointment.date,
                    docId: appointment.doctorId,
                    doctorAbout: appointment.doctorAbout,
                    doctorDegree: appointment.doctorDegree,
                    doctorEmail: appointment.doctorEmail,
                    doctorExperience: appointment.doctorExperience,
                    doctorFees: appointment.doctorFees,
                    doctorImage: appointment.doctorImage,
                    doctorName: appointment.doctorName,
                    doctorSpeciality: appointment.doctorSpeciality,
                    time: appointment.time,
                };

                handleCancelledBooking(bookingDetails);
                await deleteAppointment(id);

                fetchAppointment(user.id);
                fetchCancelledAppointment(user.id);
                alert(`Appointment has been cancelled.`);
            } catch (err) {
                console.log("Failed to cancel the appointment:", err);
            }
        }
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        setUser(user);

        if (!user || !user.id) {
            alert('Patient ID not found. Please log in again.');
            return;
        }

        fetchAppointment(user.id);
        fetchCancelledAppointment(user.id);
    }, []);

    if (loading) return <p>Loading appointments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointments</p>
            <div>
                {appointments.map((appointment) => (
                    <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={appointment.bookingId}>
                        <div>
                            <img
                                className="w-32 h-24 bg-indigo-50"
                                src={`data:image/png;base64,${appointment.doctorImage}`}
                                alt={appointment.doctorName}
                            />
                        </div>
                        <div className='flex-1 text-sm text-zinc-600'>
                            <p className='text-neutral-800 font-semibold'>{appointment.doctorName}</p>
                            <p>{appointment.doctorSpeciality}</p>
                            <p>{appointment.doctorDegree}</p>
                            <p className='text-xs mt-1'>{appointment.doctorExperience} of experience</p>
                            <p className='text-xs text-neutral-700'>{appointment.doctorAbout}</p>
                            <p className='text-sm font-medium mt-1'>Fees: ${appointment.doctorFees}</p>
                            
                            <p className='text-xs mt-1'>
                                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {appointment.date} | {appointment.time}
                            </p>
                        </div>
                        
                        {/* Right-aligned status and cancel button */}
                        <div className='flex flex-col justify-between items-end'>
                            {/* Display booking status */}
                            <p className='text-sm mt-2'>
                                {appointment.status === null ? (
                                    <button
                                        onClick={() => handleDelete(appointment.bookingId, appointment)}
                                        className={`text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300`}
                                    >
                                        Cancel Appointment
                                    </button>
                                ) : (
                                    <span
                                        className={`inline-block px-4 py-1 rounded-full 
                                            ${appointment.status === 'ACCEPTED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}
                                    >
                                        {appointment.status}
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <p className='pb-3 mt-12 font-medium text-red-600 border-b'>Cancelled Appointments</p>

            <div>
                {cancelledAppointments.length > 0 ? (
                    cancelledAppointments.map((appointment) => (
                        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={appointment.bookingId}>
                            <div>
                                <img
                                    className="w-32 h-24 bg-indigo-50"
                                    src={`data:image/png;base64,${appointment.doctorImage}`}
                                    alt={appointment.doctorName}
                                />
                            </div>
                            <div className='flex-1 text-sm text-zinc-600'>
                                <p className='text-neutral-800 font-semibold'>{appointment.doctorName}</p>
                                <p>{appointment.doctorSpeciality}</p>
                                <p>{appointment.doctorDegree}</p>
                                <p className='text-xs mt-1'>{appointment.doctorExperience} of experience</p>
                                <p className='text-xs text-neutral-700'>{appointment.doctorAbout}</p>
                                <p className='text-sm font-medium mt-1'>Fees: ${appointment.doctorFees}</p>
                                
                                <p className='text-xs mt-1'>
                                    <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {appointment.date} | {appointment.time}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-sm text-zinc-600'>No cancelled appointments.</p>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;
