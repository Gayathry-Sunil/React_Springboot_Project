import axios from "axios";

const CommonAPIs = async (httpMethods, url, reqBody = {}) => {
    //console.log(reqBody);
    const reqConfig = {
        url,
        method: httpMethods,
        data: reqBody,
        
    };

    try {
        const res = await axios(reqConfig);
        return res;  // Return only the data from the response
    } catch (err) {
        console.error("API request error:", err);
        throw err;  // Throw error for higher-level handling
    }
};

export default CommonAPIs;