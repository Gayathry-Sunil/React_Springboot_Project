import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { getDoctors } from '../services/AllAPIs'; 

const TopDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext);

    useEffect(() => {
        // setToken(true);
        const storedUser = sessionStorage.getItem('user');
        const initialUserData = storedUser ? JSON.parse(storedUser) : null;

        if(initialUserData){
            setToken(true);
        }

        const fetchDoctors = async () => {
            try {
                const data = await getDoctors();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, [setToken]);

    return (
        <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {doctors.slice(0, 12).map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item.id}`); window.scrollTo(0,0); }}
                        className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'
                        key={index}
                    >
                        {/* Display the doctor's image from base64 */}
                        <img 
                            className='bg-blue-50' 
                            src={`data:image/jpeg;base64,${item.doctorImage}`} 
                            alt="Doctor" 
                        />
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                                <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                            </div>
                            {/* Display the doctor's name */}
                            <p className='text-gray-900 text-lg font-medium'>{item.doctorName}</p>
                            {/* Display additional information, e.g., doctor email or specialty */}
                            <p className='text-gray-600 text-sm'>{item.doctorEmail}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
        </div>
    );
};

export default TopDoctors;

