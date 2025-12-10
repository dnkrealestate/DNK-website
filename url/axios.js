import axios from "axios";

// const URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8800/";

// export { URL };

// const WWURL = "http://localhost:3000/";

// export { WWURL };

const URL =
    process.env.NEXT_PUBLIC_API_URL || "https://api.dnkre.com/";

export { URL };
    
const WWURL =
    process.env.WWW_PUBLIC_API_URL || "https://api.dnkre.com/";

export { WWURL };  
    
const axiosPrivate = axios.create({
    baseURL: URL,
    headers: {},
    withCredentials: true,
});

export default axiosPrivate;
