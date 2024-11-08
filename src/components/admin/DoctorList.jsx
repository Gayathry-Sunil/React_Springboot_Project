// src/components/admin/DoctorList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import './AdminPanel.css';

const DoctorList = () => {
  const { doctors } = useContext(AppContext); // Assuming doctors data is provided via context
  const [doctorList, setDoctorList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load doctors from context or any API
    setDoctorList(doctors);
  }, [doctors]);

  return (
    <div>
      <p className='text-gray-600'>Manage doctors in the admin panel.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            doctorList.map((item, index) => (
              <div className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                  <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                  </div>
                  <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                  <p className='text-gray-600 text-sm'>{item.speciality}</p>
                  <p className='text-gray-600 text-sm'>{item.email}</p>
                  <p className='text-gray-600 text-sm'>{item.experience} years experience</p>
                  <p className='text-gray-600 text-sm'>Fees: {item.fees}</p>
                  <div className="flex gap-2 mt-2">
                 
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => navigate(`/admin/delete-doctor/${item._id}`)}>Delete</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
