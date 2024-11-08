import React, { useState, useEffect,useContext } from 'react'
import { assets } from '../assets/assets'
import {updateUser} from '../services/AllAPIs'
import { AppContext } from '../context/AppContext';

const MyProfile = () => {

    const { setToken } = useContext(AppContext);
    
    const storedUser = sessionStorage.getItem('user');
    const initialUserData = storedUser ? JSON.parse(storedUser) : null;

    const [userData, setUserData] = useState(initialUserData);
    const [isEdit, setIsEdit] = useState(false);


    // const handleSave = () => {
        
    //     sessionStorage.setItem('user', JSON.stringify(userData));
    //     const userBody = JSON.stringify(userData);
    //     updateUser(userBody);
    //     setIsEdit(false);
    // };


    const handleSave = () => {
        // Ensure phone is a float
        const updatedUserData = {
            ...userData,
            patientPhone: parseFloat(userData.patientPhone),  // Convert to float
        };
    
        sessionStorage.setItem('user', JSON.stringify(updatedUserData));
        updateUser(updatedUserData);  // Send the updated data
        setIsEdit(false);
    };

    useEffect(() => {
        setToken(true);
    }, [setToken]);
    

    

    
    if (!userData) {
        return <p>No profile data available. Please set up your profile.</p>;
    }

    return (
        <div className='max-w-lg flex flex-col gap-2 text-sm'>
            
            {
                isEdit 
                    ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.patientName} onChange={e => setUserData(prev => ({ ...prev, patientName: e.target.value }))} />
                    : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.patientName}</p>
            }

            <hr className='bg-zinc-400 h-[1px] border-none'/>
            <div>
                <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>Email id:</p>
                    {
                        isEdit
                            ? <input value={userData.emailId} onChange={e => setUserData(prev => ({ ...prev, emailId: e.target.value }))} type="text" />
                            : <p className='text-blue-500'>{userData.emailId}</p>
                    }
                    <p className='font-medium'>Phone:</p>
                    {
                        isEdit
                            ? <input className='bg-gray-100 max-w-52' value={userData.patientPhone} onChange={e => setUserData(prev => ({ ...prev, patientPhone: e.target.value }))} type="text" />
                            : <p className='text-blue-400'>{userData.patientPhone}</p>
                    }
                    
                </div>
            </div>
            <div>
                <p className='text-neutral-500 underline mt-3' >BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
                    <p className='font-medium'>GENDER</p>
                    {
                        isEdit
                            ? <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, patientGender: e.target.value }))} value={userData.patientGender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p className='text-gray-400'>{userData.patientGender}</p>
                    }
                    <p className='font medium'>Date of Birth:</p>
                    {
                        isEdit 
                        ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({ ...prev, patientDob: e.target.value }))} value={userData.patientDob}/>
                        : <p className='text-gray-400'>{userData.patientDob}</p>
                    }
                </div> 
            </div>

            <div className='mt-10'>
                {
                    isEdit
                    ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={handleSave}>Save information</button>
                    : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile;
