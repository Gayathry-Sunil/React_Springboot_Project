import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import serverUrl from "../services/BaseUrl";
import axios from "axios";

const Doctors = () => {
    const { speciality } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [filterDoc, setFilterDoc] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${serverUrl}/doctor/alldoctors`);
            console.log(response.data);
            setDoctors(response.data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch doctors.");
            setLoading(false);
        }
    };

    const applyFilter = () => {
        if (speciality) {
            setFilterDoc(doctors.filter((doc) => doc.doctorSpeciality === speciality));
        } else {
            setFilterDoc(doctors);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [doctors, speciality]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <p className="text-gray-600">Browse through doctor specialists.</p>
            <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                    <p
                        onClick={() =>
                            speciality === "General physician"
                                ? navigate("/doctors")
                                : navigate("/doctors/General physician")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "General physician"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        General physician
          </p>
                    <p
                        onClick={() =>
                            speciality === "Gynecologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Gynecologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
                            }`}
                    >
                        Gynecologist
          </p>
                    <p
                        onClick={() =>
                            speciality === "Dermatologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Dermatologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
                            }`}
                    >
                        Dermatologist
          </p>
                    <p
                        onClick={() =>
                            speciality === "Pediatricians"
                                ? navigate("/doctors")
                                : navigate("/doctors/Pediatricians")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
                            }`}
                    >
                        Pediatricians
          </p>
                    <p
                        onClick={() =>
                            speciality === "Neurologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Neurologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
                            }`}
                    >
                        Neurologist
          </p>
                    <p
                        onClick={() =>
                            speciality === "Gastroenterologist"
                                ? navigate("/doctors")
                                : navigate("/doctors/Gastroenterologist")
                        }
                        className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                            speciality === "Gastroenterologist"
                                ? "bg-indigo-100 text-black"
                                : ""
                            }`}
                    >
                        Gastroenterologist
          </p>
                </div>

                <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
                    {filterDoc.map((item, index) => (
                        <div
                            onClick={() => navigate(`/appointment/${item.id}`)}
                            className="border border-blue-200 rounded-x1 overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
                            key={index}
                        >
                            {/* Make sure to use doctorImage and doctorName */}
                            <img className="bg-blue-50" src={`data:image/png;base64,${item.doctorImage}`} alt={item.doctorName} />
                            <div className="p-4">
                                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                                    <p>Available</p>
                                </div>
                                {/* Use doctorName instead of name */}
                                <p className="text-gray-900 text-lg font-medium">{item.doctorName}</p>
                                {/* Ensure the speciality field is accessible correctly */}
                                <p className="text-gray-600 text-sm">{item.doctorSpeciality
                                    || "No speciality available"}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Doctors;