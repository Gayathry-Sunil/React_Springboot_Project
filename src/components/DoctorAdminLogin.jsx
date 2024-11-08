// src/components/DoctorAdminLogin.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const DoctorAdminLogin = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Dummy hardcoded admin credentials
        if (email === "admin@example.com" && password === "1234") {
            navigate("/admin/dashboard"); // Admin dashboard route
        } else {
            // Dummy hardcoded doctor credentials
            if (email === "doctor@example.com" && password === "1234") {
                // Mock doctor response
                const response = { id: "123" }; // Example response for doctor
                navigate(`/doctor/${response.id}/appointments`); // Redirect to doctor's appointments page
            } else {
                alert("Invalid credentials");
            }

            // // Uncomment and replace with actual API call for checking doctor credentials
            // const response = await checkDoctorCredentials(email, password);
            // if (response) {
            //     navigate(`/doctor/${response.id}`); // Redirect to doctor's appointments page
            // } else {
            //     alert("Invalid credentials");
            // }
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={(e) => e.preventDefault()}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>Doctor/Admin Login</p>
                <p>Please log in to view appointments</p>

                <div className='w-full'>
                    <label htmlFor="email" className='text-sm font-medium'>Email</label>
                    <input
                        id="email"
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>

                <div className='w-full'>
                    <label htmlFor="password" className='text-sm font-medium'>Password</label>
                    <input
                        id="password"
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </div>

                <button
                    type="button"
                    className='bg-primary text-white w-full py-2 rounded-md text-base'
                    onClick={handleLogin}
                >
                    Login
                </button>

                <p className='text-sm'>
                    User login?{' '}
                    <Link to="/login" className='text-primary underline'>
                        Click here
                    </Link>
                </p>
            </div>
        </form>
    );
};

export default DoctorAdminLogin;
