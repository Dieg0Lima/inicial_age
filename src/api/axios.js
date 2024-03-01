import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ageatende/api',
});

export default axiosInstance;
