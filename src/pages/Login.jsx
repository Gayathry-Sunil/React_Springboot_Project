import React, { useState, useContext } from 'react';
import { savePatient, checkUser, checkEmail } from '../services/AllAPIs';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext); 
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Track visibility of password

    const onSubmitHandler = (event) => {
        event.preventDefault();
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        setError(''); // Clear any existing error

        // Check for valid email and non-empty password
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Password is required.");
            return;
        }

        try {
            const response = await checkUser(email, password);
            if (response) {
                sessionStorage.setItem('user', JSON.stringify(response));
                setToken(true); 
                navigate("/"); // Navigate to home page after successful login
            } else {
                setError("Invalid email or password. Please try again.");
            }
        } catch (error) {
            console.error('Login failed', error);
            setError("An error occurred. Please try again later.");
        }
    };

    const alreadyUser = async (email) => {
        try {
            const response = await checkEmail(email);
            return response !== -1;  // Return true if email exists, false if not
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const addPatient = async () => {
        setError(''); // Clear any existing error

        // Validate email, name, and password fields
        if (!name) {
            setError("Full name is required.");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Password is required.");
            return;
        }

        if (await alreadyUser(email)) {
            setError("User already exists. Check your email.");
            setEmail('');
            return;
        }

        const patientDetails = {
            patientName: name,
            emailId: email,
            patientPassword: password,
        };

        try {
            await savePatient(patientDetails);
            alert("You have successfully registered.");
            setName('');
            setEmail('');
            setPassword('');
            setState('Login');
        } catch (error) {
            console.error('Error registering patient:', error);
            setError("An error occurred during registration. Please try again later.");
        }
    };

    // Function to handle Enter key press
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (state === 'Sign Up') {
                addPatient(); // Call addPatient for sign up
            } else {
                handleLogin(); // Call handleLogin for login
            }
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler} onKeyDown={handleKeyDown}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
                <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book an appointment</p>
                
                {state === "Sign Up" && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input
                            className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="text"
                            onChange={(e) => {
                                setName(e.target.value);
                                setError(''); // Clear error on input change
                            }}
                            value={name}
                            required
                        />
                    </div>
                )}

                <div className='w-full'>
                    <p>Email</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type="email"
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError(''); // Clear error on input change
                        }}
                        value={email}
                        required
                    />
                </div>

                <div className='w-full relative'>
                    <p>Password</p>
                    <input
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type={showPassword ? 'text' : 'password'} // Toggle input type based on showPassword state
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError(''); // Clear error on input change
                        }}
                        value={password}
                        required
                    />
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
                    onClick={() => {
                        if (state === 'Sign Up') {
                            addPatient();
                        } else {
                            handleLogin();
                        }
                    }}
                >
                    {state === 'Sign Up' ? "Create Account" : "Login"}
                </button>
                
                {state === "Sign Up" ? (
                    <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
                ) : (
                    <p>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
                )}

                <p>Doctor login? <Link to="/doctor-login" className='text-primary underline'>Click here</Link></p>
        
            </div>
        </form>
    );
};

export default Login;
