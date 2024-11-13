import serverUrl from "./BaseUrl"
import CommonAPIs from "./CommonAPIs"

export const bookDoctor = (docDetails) => {
    CommonAPIs("POST", `${serverUrl}/book`, docDetails)
}

export const checkCount = async (docId, date, time) => {
    const response = await CommonAPIs("GET", `${serverUrl}/book/count?docId=${docId}&date=${date}&time=${time}`);
    return response.data;
}

export const savePatient = (patientDetails) => {
    CommonAPIs("POST", `${serverUrl}/patient`, patientDetails);
}

export const saveDoctor = (doctorDetails) => {
    CommonAPIs("POST", `${serverUrl}/doctor/add`, doctorDetails);
}

export const handleCancelledBooking = (bookingDetails) => {
  CommonAPIs("POST", `${serverUrl}/cancel`, bookingDetails);
}

export const checkUser = async (emailId, patientPassword) => {
    const response = await CommonAPIs("GET", `${serverUrl}/patient/userlogin?emailId=${emailId}&patientPassword=${patientPassword}`);
    return response.data;

}

export const checkEmail = async (email) => {
    const reponse = await CommonAPIs("GET", `${serverUrl}/patient/check?emailId=${email}`);
    
    return reponse.data;
}

export const updateUser = (userData) => {
    console.log(userData);
    CommonAPIs("PUT", `${serverUrl}/patient/update`, userData);
}

export const updateDoctor =  (doctorData) => {
  CommonAPIs("PUT", `${serverUrl}/doctor/update`, doctorData);
};


export const getDoctors = async () => {
    const reponse = await CommonAPIs("GET", `${serverUrl}/doctor/alldoctors`);
    return reponse.data;
}


export const deleteDoctor = async (id) => {
    const response = await CommonAPIs("DELETE", `${serverUrl}/doctor/delete/${id}`);
    return response;
}

export const deleteAppointment = async (id) => {
  
  const response = await CommonAPIs("DELETE", `${serverUrl}/book/delete/${id}`);
  return response;
};



export const fetchAppointments = async (id) => {
      const response = await CommonAPIs("GET", `${serverUrl}/book/appoinment/${id}`); 
      return response.data;
  
};

export const fetchCancelled = async (id) => {
  const response = await CommonAPIs("GET", `${serverUrl}/cancel/booking/${id}`); 
  return response.data;

};



export const checkDoctor = async (emailId, Password) => {
  const response = await CommonAPIs("GET", `${serverUrl}/doctor/check?email=${emailId}&password=${Password}`);
  return response.data;

}
  


export const getDoctorById = async (docId) => {
    try {
      const response = await fetch(`${serverUrl}/doctor/${docId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Doctor not found (Status: ${response.status})`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      throw error;
    }
  };






  export const getDoctorAppointments = async (docId) => {
    const response = await CommonAPIs(
      "GET",
      `${serverUrl}/book/getappoinments/${docId}`
    );
    return response.data;
  };
  
  export const updateBookingStatus = async (bookingId, status) => {
    const response = await CommonAPIs(
      "PUT",
      `${serverUrl}/book/updatestatus/${bookingId}/status?status=${status}`
    );
    return response.data;
  };


  // export const fetchDoctorDetails = async (doctorId) => {
  //   try {
  //     const response = await CommonAPIs("GET", `${serverUrl}/doctor/check?email=${emailId}&password=${Password}`);
  //     return response.json();
  //   } catch (error) {
  //     console.error("Error fetching doctor details:", error);
  //     throw error;
  //   }
  // };



