import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = "https://applemore-api-gateway.azurewebsites.net/api";
// const API_BASE_URL = "http://localhost:8080/api";

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        
    },
});

// Add a request interceptor to include the JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt_token'); // Assume token is stored in localStorage
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;