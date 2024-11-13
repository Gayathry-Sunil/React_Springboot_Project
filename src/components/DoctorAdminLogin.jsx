import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { checkDoctor } from '../services/AllAPIs';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

const DoctorAdminLogin = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setError(''); // Clear previous errors

        // Validation checks
        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        
        if (email === "admin@gmail.com" && password === "1234") {
            sessionStorage.setItem('admin', JSON.stringify(email));
            setToken(true); 
            navigate("/admin/doctors-list"); // Admin dashboard route
        } else {
            // Uncomment and replace with actual API call for checking doctor credentials
            const response = await checkDoctor(email, password);
            if (response) {
                sessionStorage.setItem('doctor', JSON.stringify(email));
                setToken(true); 
                navigate(`/doctor/${response.id}/appointments`);
            } else {
                setError("Invalid credentials. Please try again.");
            }
        }
    };

    // Reset error on input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError(''); // Clear error when user types
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError(''); // Clear error when user types
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();  // Trigger login on Enter key press
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
                        onChange={handleEmailChange}
                        value={email}
                        onKeyDown={handleKeyPress}  // Trigger login on Enter key press
                        required
                    />
                </div>

                <div className='w-full relative'>
                    <label htmlFor="password" className='text-sm font-medium'>Password</label>
                    <input
                        id="password"
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type={showPassword ? 'text' : 'password'}  // Toggle password visibility
                        onChange={handlePasswordChange}
                        value={password}
                        onKeyDown={handleKeyPress}  // Trigger login on Enter key press
                        required
                    />
                    {/* Eye icon */}
                    <span
                        className="absolute right-2 top-[70%] transform -translate-y-1/2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Eye icon toggle */}
                    </span>
                </div>

                {error && (
                    <div className="text-red-500 text-sm mt-2">
                        {error}
                    </div>
                )}

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
