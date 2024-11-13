import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

                {/* ------------ Left Section -------- */}
                <div>
                    <Link to="/" className="mb-5">
                        <img className='w-40' src={assets.logo} alt="Company Logo" />
                    </Link>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Our platform connects you with a wide range of healthcare professionals, allowing you to book appointments at your convenience, view availability in real-time, and receive reminders to keep you on track. Our mission is to empower you with easy access to quality medical care, ensuring that your health needs are met with much efficiency and compassion.</p>
                </div>

                {/* ------------ Center Section -------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>
                            <Link to="/" className='hover:text-primary'>Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className='hover:text-primary'>About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact" className='hover:text-primary'>Contact Us</Link>
                        </li>
                        {/* <li>
                    <Link to="/privacy-policy" className='hover:text-primary'>Privacy Policy</Link>
                </li> */}
                    </ul>
                </div>

                {/* ------------ Right Section -------- */}
                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li>+91 8978675678</li>
                        <li>prescriptodoc@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* ------------Copyright Text ------------ */}
            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2024@Prescripto - All Right Reserved.</p>
            </div>
        </div>

    )
}

export default Footer