import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DoctorProfileForm.css";
import { updateDoctor, getDoctorById } from "../../services/AllAPIs";

function DoctorProfileForm() {
  const { id } = useParams();
  console.log("Doctor ID from URL:", id);

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
    picture: null, // Add picture field for image
  });

  const fetchProfile = async (doctorId) => {
    try {
      const profileData = await getDoctorById(doctorId);
      console.log(profileData);
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
        picture: profileData.doctorImage, // Assuming the API returns the image as base64 or URL
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prevForm) => ({
          ...prevForm,
          picture: reader.result, // Save the base64 image result
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a doctor object with the form data
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
      doctorImage: form.picture ? form.picture : null, // Check if there's a picture
    };
  
    // Pass the doctor object to updateDoctor
    console.log(doctor.doctorExperience);
    updateDoctor(doctor);
  };
  

  useEffect(() => {
    fetchProfile(id);
  }, [id]);

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

        <button
          className="bg-indigo-500 text-white hover:bg-indigo-600 submit-button"
          type="submit"
        >
          Edit Profile
        </button>
      </form>
    </div>
  );
}

export default DoctorProfileForm;
