import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import { getDoctors, deleteDoctor, getDoctorAppointments } from '../../services/AllAPIs';
import { AppContext } from '../../context/AppContext';

const DoctorList = () => {
  const [doctorList, setDoctorList] = useState([]);
  const { setToken } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to fetch doctors from API
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await getDoctors(); // Make sure serverUrl is defined
      console.log(response);
      setDoctorList(response);  // Set fetched data to doctorList state
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch doctors.");
      setLoading(false);
    }
  };

  // Function to handle delete request
  const handleDelete = async (id, doctorName) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm(`Do you want to delete ${doctorName}?`);
  
    if (confirmDelete) {
      try {
        const deletionResponse = await getDoctorAppointments(id);
  
        // Check if the array has any bookings
        if (deletionResponse && deletionResponse.length > 0) {
          alert("This doctor has bookings.");
        } else {
          const response = await deleteDoctor(id);
          alert("Deleted Successfully");
          fetchDoctors();  // Refresh the doctor list after deletion
        }
      } catch (error) {
        alert("Error deleting doctor.");
      }
    }
  };

  // Fetch doctors when the component mounts
  useEffect(() => {
    // Check if admin is in sessionStorage
    const storedUser = sessionStorage.getItem('admin');
    const initialUserData = storedUser ? JSON.parse(storedUser) : null;

    if (initialUserData === null) {
      setToken(false); // No admin found, set token to false
      navigate('/login'); // Optionally, redirect to login page
    } else {
      setToken(true); // Admin found, set token to true
      fetchDoctors(); // Fetch doctors only if admin exists
    }
  }, [setToken, navigate]);

  // Display loading or error message if needed
  if (loading) return <p>Loading doctors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <p className='text-gray-600'>Manage doctors in the admin panel.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {doctorList.map((item, index) => (
            <div className='border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
              <img className='bg-blue-50' src={`data:image/png;base64,${item.doctorImage}`} alt={item.doctorName} />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.doctorName}</p>
                <p className='text-gray-600 text-sm'>{item.doctorSpeciality}</p>
                <p className='text-gray-600 text-sm'>{item.doctorEmail}</p>
                <p className='text-gray-600 text-sm'>{item.doctorExperience} years experience</p>
                <p className='text-gray-600 text-sm'>Fees: {item.doctorFees}</p>
                <div className="flex gap-2 mt-2">
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(item.id, item.doctorName)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
