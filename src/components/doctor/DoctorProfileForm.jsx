import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import "./DoctorProfileForm.css";
import { updateDoctor, getDoctorById } from "../../services/AllAPIs";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

function DoctorProfileForm() {
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    fees: "",
    speciality: "General physician",
    degree: "",
    address1: "",
    address2: "",
    aboutDoctor: "",
    picture: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProfile = async (doctorId) => {
    try {
      const profileData = await getDoctorById(doctorId);
      setForm({
        name: profileData.doctorName,
        email: profileData.doctorEmail,
        password: profileData.doctorPassword,
        experience: profileData.doctorExperience,
        fees: profileData.doctorFees,
        speciality: profileData.doctorSpeciality,
        degree: profileData.doctorDegree,
        address1: profileData.addressLineOne,
        address2: profileData.addressLineTwo,
        aboutDoctor: profileData.doctorAbout,
        picture: profileData.doctorImage,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value) error = "Name is required.";
        break;
      case "email":
        if (!value) error = "Email is required.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Enter a valid email.";
        break;
      case "password":
        if (!value) error = "Password is required.";
        else if (value.length < 6)
          error = "Password must be at least 6 characters long.";
        break;
      case "experience":
        if (!value) error = "Experience is required.";
        else if (isNaN(value)) error = "Experience must be a number.";
        break;
      case "fees":
        if (!value) error = "Fees are required.";
        else if (isNaN(value)) error = "Fees must be a number.";
        break;
      case "degree":
        if (!value) error = "Degree is required.";
        break;
      case "address1":
        if (!value) error = "Address Line 1 is required.";
        break;
      case "aboutDoctor":
        if (!value) error = "About Doctor section is required.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prevForm) => ({
          ...prevForm,
          picture: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((field) => {
      const error = validateField(field, form[field]);
      if (error) newErrors[field] = error;
    });
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      const doctor = {
        id: id,
        doctorName: form.name,
        doctorEmail: form.email,
        doctorPassword: form.password,
        doctorExperience: form.experience,
        doctorFees: form.fees,
        doctorSpeciality: form.speciality,
        doctorDegree: form.degree,
        addressLineOne: form.address1,
        addressLineTwo: form.address2,
        doctorAbout: form.aboutDoctor,
        doctorImage: form.picture || null,
      };
      try {
        await updateDoctor(doctor);
        alert("Doctor profile updated successfully!");
      } catch (error) {
        console.error("Error updating doctor profile:", error);
        alert("Failed to update profile. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    fetchProfile(id);
  }, [id]);

  useEffect(() => {
    
    const storedUser = sessionStorage.getItem('doctor');
    const initialUserData = storedUser ? JSON.parse(storedUser) : null;

    if (initialUserData === null) {
      setToken(false); 
      navigate('/login'); // Optionally, redirect to login page
    } else {
      setToken(true); 
      
    }
  }, [setToken, navigate]);

  return (
    <div className="add-doctor-page">
      <h2 className="page-title">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="add-doctor-form">
        <div className="form-section">
          <label>Upload profile picture </label>
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
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="email"
            name="email"
            placeholder="Doctor Email"
            onChange={handleChange}
            value={form.email}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="form-row">
          <input
            type="password"
            name="password"
            placeholder="Set Password"
            onChange={handleChange}
            value={form.password}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            type="text"
            name="experience"
            placeholder="Experience"
            onChange={handleChange}
            value={form.experience}
          />
          {errors.experience && <p className="error">{errors.experience}</p>}
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
          {errors.degree && <p className="error">{errors.degree}</p>}
        </div>

        <div className="form-row">
          <input
            type="text"
            name="address1"
            placeholder="Address 1"
            onChange={handleChange}
            value={form.address1}
          />
          {errors.address1 && <p className="error">{errors.address1}</p>}
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
          {errors.fees && <p className="error">{errors.fees}</p>}
          <textarea
            name="aboutDoctor"
            placeholder="About Doctor"
            onChange={handleChange}
            value={form.aboutDoctor}
          />
          {errors.aboutDoctor && <p className="error">{errors.aboutDoctor}</p>}
        </div>

        <button
          className="bg-indigo-500 text-white hover:bg-indigo-600 submit-button"
          type="submit"
          disabled={isSubmitting}
        >
          Edit Profile
        </button>
      </form>
    </div>
  );
}

export default DoctorProfileForm;
