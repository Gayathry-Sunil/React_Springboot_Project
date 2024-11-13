import React, { useState, useEffect,useContext } from 'react';
import './AddDoctorForm.css';
import { saveDoctor } from '../../services/AllAPIs';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function AddDoctorForm() {
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
    aboutDoctor: '',
    picture: null
  });


  const { setToken } = useContext(AppContext);
  
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formValid, setFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation: no numbers
    if (touched.name && !/^[.a-zA-Z\s]+$/.test(form.name)) {
      newErrors.name = 'Name should not contain numbers.';
    }

    // Email validation
    if (touched.email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = 'Email should be in the format "name@domain.com".';
    }

    // Password validation
    if (touched.password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)) {
      newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
    }

    // Fees validation: numeric only
    if (touched.fees && !/^\d+$/.test(form.fees)) {
      newErrors.fees = 'Fees should be numeric.';
    }

    setErrors(newErrors);

    // Check if form is valid
    const isValid = Object.keys(newErrors).length === 0 &&
                    form.name && form.email && form.password &&
                    form.experience && form.fees && form.degree &&
                    form.address1 && form.address2 && form.aboutDoctor &&
                    form.picture;
    setFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [form, touched]);

  useEffect(() => {
    // Check if admin is in sessionStorage
    const storedUser = sessionStorage.getItem('admin');
    const initialUserData = storedUser ? JSON.parse(storedUser) : null;

    if (initialUserData === null) {
      setToken(false); // No admin found, set token to false
      navigate('/login'); // Optionally, redirect to login page
    } else {
      setToken(true); // Admin found, set token to true
      
    }
  }, [setToken, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, picture: e.target.files[0] });
    setTouched({ ...touched, picture: true });
  };

  const addDoctor = async () => {
    validateForm();
    const hasErrors = Object.keys(errors).length > 0;
    const allFieldsFilled = form.name && form.email && form.password && form.experience &&
                            form.fees && form.degree && form.address1 && form.address2 &&
                            form.aboutDoctor && form.picture;
                            

    // Show popup if any required fields are empty
    if (!allFieldsFilled || hasErrors) {
      alert("Please correct errors and fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("doctorName", form.name);
    formData.append("doctorEmail", form.email);
    formData.append("doctorPassword", form.password);
    formData.append("doctorExperience", form.experience);
    formData.append("doctorFees", form.fees);
    formData.append("doctorSpeciality", form.speciality);
    formData.append("doctorDegree", form.degree);
    formData.append("addressLineOne", form.address1);
    formData.append("addressLineTwo", form.address2);
    formData.append("doctorAbout", form.aboutDoctor);
    formData.append("doctorImage", form.picture);

    try {
      await saveDoctor(formData);
      alert("Doctor added successfully!");
      setForm({
        name: '',
        email: '',
        password: '',
        experience: '',
        fees: '',
        speciality: 'General physician',
        degree: '',
        address1: '',
        address2: '',
        aboutDoctor: '',
        picture: null
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  return (
    <div className="add-doctor-page">
      <h2 className="page-title">Add Doctor</h2>
      <form className="add-doctor-form">
        <div className="form-section">
          <label>Upload doctor picture</label>
          <input type="file" name="picture" onChange={handleFileChange} />
          {touched.picture && errors.picture && <span className="error">{errors.picture}</span>}
        </div>

        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.name}
          />
          {touched.name && errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.email}
          />
          {touched.email && errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-row">
          <input
            type="password"
            name="password"
            placeholder="Set Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.password}
          />
          {touched.password && errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-row">
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.experience}
          />
        </div>

        <div className="form-row">
          <select
            name="speciality"
            onChange={handleChange}
            onBlur={handleBlur}
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
            onBlur={handleBlur}
            value={form.degree}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="address1"
            placeholder="Address 1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.address1}
          />
          <input
            type="text"
            name="address2"
            placeholder="Address 2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.address2}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            name="fees"
            placeholder="Fees"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.fees}
          />
          {touched.fees && errors.fees && <span className="error">{errors.fees}</span>}
        </div>

        <div className="form-row">
          <textarea
            name="aboutDoctor"
            placeholder="About Doctor"
            onChange={handleChange}
            onBlur={handleBlur}
            value={form.aboutDoctor}
          />
        </div>

        <button 
          type="button" 
          onClick={addDoctor} 
          className="bg-indigo-500 text-white hover:bg-indigo-600 submit-button"
        >
          Add Doctor
        </button>
      </form>
    </div>
  );
}

export default AddDoctorForm;