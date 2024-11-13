import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getDoctorById } from '../services/AllAPIs';
import RelatedDoctors from '../components/RelatedDoctors';
import { bookDoctor, checkCount } from '../services/AllAPIs';

const Appointment = () => {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const { docId } = useParams();
    const { currencySymbol } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const [bookingCount, setBookingCount] = useState(false);

    // Fetch doctor details by ID from the API
    // const fetchDocInfo = async () => {
    //     try {
    //         const doctorData = await getDoctorById(docId);  // Call your API to get the doctor's details
    //         setDocInfo(doctorData);
    //         console.log(doctorData);
    //     } catch (error) {
    //         console.error('Failed to fetch doctor details:', error);
    //     }
    // };

    const fetchDocInfo = async () => {
        try {
            const doctorData = await getDoctorById(docId);
            setDocInfo({
                name: doctorData.doctorName,
                image: doctorData.doctorImage,
                degree: doctorData.doctorDegree,
                speciality: doctorData.doctorSpeciality,
                experience: doctorData.doctorExperience,
                about: doctorData.doctorAbout,
                fees: doctorData.doctorFees,
            });
        } catch (error) {
            console.error('Failed to fetch doctor details:', error);
        }
    };


    const getAvailableSlots = async () => {
        setDocSlots([]);

        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                timeSlots.push({
                    datetime: new Date(currentDate),
                    time: formattedTime
                });

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));
        }
    };

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const initialUserData = storedUser ? JSON.parse(storedUser) : null;

        if(initialUserData){
            setToken(true);
        }
    }, [setToken]);

    useEffect(() => {
        fetchDocInfo();
    }, [docId]);  // Fetch doctor data when the component mounts or docId changes

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    const handleBooking = async () => {

        if (docSlots.length === 0 || !slotTime) {
            alert('Please select both a date and time for the appointment.');
            return;
        }

        try {
            const date = docSlots[slotIndex][0].datetime.toISOString().split('T')[0];
            const time = slotTime;
            const countResponse = await checkCount(docId, date, time);

            if (countResponse < 5) {
                handleBookAppointment();
            } else {
                alert('The booking for the particular slot is finished. Try booking another slot as early as possible. Thank you.');
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Booking count cannot be fetched');
        }
    };

    const handleBookAppointment = async () => {
        const storedUser = sessionStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (!user || !user.id) {
            alert('Patient ID not found. Please log in again.');
            return;
        }

        const bookingDetails = {
            patientId: user.id,
            docId: docId,
            date: docSlots[slotIndex][0].datetime.toISOString().split('T')[0],
            time: slotTime
        };

        try {
            await bookDoctor(bookingDetails);
            alert('Appointment booked successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment. Please try again.');
        }
    };

    return docInfo && (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img
                        className="bg-primary w-full sm:max-w-72 rounded-lg"
                        src={`data:image/png;base64,${docInfo.image}`}
                        alt={docInfo.name}
                    />

                </div>

                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900 '>
                        {docInfo.name}
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience} Years</button>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
                            About
                        </p>
                        <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-4'>
                        Appointment Fee: <span className='text-gray-600'>{currencySymbol} {docInfo.fees}</span>
                    </p>
                </div>
            </div>

            <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
                <p>Booking Slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'}`} key={index}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>
                <button onClick={handleBooking} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
            </div>

            <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
    );
};

export default Appointment;