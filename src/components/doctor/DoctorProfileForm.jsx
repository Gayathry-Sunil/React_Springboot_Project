import React, { useState } from 'react';
import './DoctorProfileForm.css'; // Import CSS for styling

function DoctorProfileForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    experience: '',
    fees: '',
    speciality: 'General physician',
    degree: '',
    address1: '',
    address2: '',
    aboutDoctor: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add doctor logic (e.g., call API to save the doctor in the database)
    console.log('Doctor added:', form);
  };

  return (
    <div className="add-doctor-page">
      <h2 className="page-title">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="add-doctor-form">
        <div className="form-section">
          <label>Upload profile picture  </label>
          <input type="file" name="picture" onChange={handleChange} />
        </div>
        
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={handleChange}
            value={form.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <div className="form-row">
          <input
            type="password"
            name="password"
            placeholder="Set Password"
            onChange={handleChange}
            value={form.password}
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            value={form.experience}
          />
        </div>

        <div className="form-row">
          <select
            name="speciality"
            onChange={handleChange}
            value={form.speciality}
          >
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            onChange={handleChange}
            value={form.degree}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="address1"
            placeholder="Address 1"
            onChange={handleChange}
            value={form.address1}
          />
          <input
            type="text"
            name="address2"
            placeholder="Address 2"
            onChange={handleChange}
            value={form.address2}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="fees"
            placeholder="Fees"
            onChange={handleChange}
            value={form.fees}
          />
          <textarea
            name="aboutDoctor"
            placeholder="About Doctor"
            onChange={handleChange}
            value={form.aboutDoctor}
          />
        </div>

        <button className="bg-indigo-500 text-white hover:bg-indigo-600 submit-button" type="submit" >Edit Profile</button>
      </form>
    </div>
  );
}

export default DoctorProfileForm;
