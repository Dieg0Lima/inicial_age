import router from "../router";
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.69.79:3000'
    ,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
