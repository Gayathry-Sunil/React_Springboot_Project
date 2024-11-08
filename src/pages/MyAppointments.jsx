import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { fetchAppointments } from '../services/AllAPIs'; // Import fetchAppointments function

const MyAppointments = () => {
    const { doctors } = useContext(AppContext); // Using context for doctors' data
    const [appointments, setAppointments] = useState([]); // State to store appointment data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch appointments data on component mount
    const fetchAppoinment = async (id) => {
        setLoading(true);
        try {
            const appointmentData = await fetchAppointments(id);

            setAppointments(appointmentData); // Update state with fetched data
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch appointments.");
            setLoading(false);
        }
    };

    useEffect(() => {
        // Get the patient info from sessionStorage
        const storedUser = sessionStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user || !user.id) {
            alert('Patient ID not found. Please log in again.');
            return;
        }

        fetchAppoinment(user.id); // Fetch appointments using the user ID
    }, []);

    // Display loading or error message if needed
    if (loading) return <p>Loading appointments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
            <div>
                {appointments.map((appointment, index) => {
                    const doctor = appointment.doctor;
                    console.log(appointment); // Assume doctor details are part of the appointment response

                    return (
                        <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                            <div>
                                <img className="'w-32 bg-indigo-50" src={`data:image/png;base64,${appointment.doctorImage}`} alt={appointment.doctorName} />
                            </div>
                            <div className='flex-1 text-sm text-zinc-600'>
                                <p className='text-neutral-800 font-semibold'>{appointment?.
                                    doctorName
                                }</p>
                                <p>{doctor?.speciality}</p>
                                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                                <p className='text-xs'>{appointment.addressLineOne1}</p>
                                <p className='text-xs'>{appointment.
                                    addressLineTwo
                                }</p>
                                <p className='text-xs mt-1'>
                                    <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span>
                                    {appointment.date} | {appointment.time}
                                </p>
                            </div>
                            <div className='flex flex-col gap-2 justify-end'>
                                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>
                                    Pay online
                                </button>
                                <button className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>
                                    Cancel appointment
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyAppointments;
