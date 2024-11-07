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

export const checkUser = async (emailId, patientPassword) => {
    const response = await CommonAPIs("GET", `${serverUrl}/patient/userlogin?emailId=${emailId}&patientPassword=${patientPassword}`);
    return response.data;

}

export const checkEmail = async (email) => {
    const reponse = await CommonAPIs("GET",`${serverUrl}/patient/check?emailId=${emailId}`);
    return reponse.data;
}

export const updateUser = (userData) => {
    console.log(userData);
    CommonAPIs("PUT",`${serverUrl}/patient/update`,userData);
}