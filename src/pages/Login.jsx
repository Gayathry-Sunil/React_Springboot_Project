import React, { useState, useContext } from 'react';
import { savePatient, checkUser, checkEmail } from '../services/AllAPIs';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext); 
    const [state, setState] = useState('Sign Up');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        try {
            const response = await checkUser(email, password);
            if (response != null) {
                sessionStorage.setItem('user', JSON.stringify(response));
                setToken(true); 
                navigate("/");
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const alreadyUser = async (email) => {
        try {
            const response = await checkEmail(email);
            console.log(response);  // Check the response in console
            return response !== -1;  // Return true if email exists, false if not
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    const addPatient = async () => {
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (await alreadyUser(email)) {  // Await the result of alreadyUser
            alert("User Already Exists. Check your email");
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
        }
    };

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
                <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book an appointment</p>
                
                {state === "Sign Up" && (
                    <div className='w-full'>
                        <p>Full Name</p>
                        <input
                            className='border border-zinc-300 rounded w-full p-2 mt-1'
                            type="text"
                            onChange={(e) => setName(e.target.value)}
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
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input
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
