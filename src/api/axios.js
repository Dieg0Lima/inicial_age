import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ageatende/api',
});

export default axiosInstance;
