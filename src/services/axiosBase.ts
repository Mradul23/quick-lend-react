import axios, { AxiosInstance } from 'axios';

const axiosService: AxiosInstance = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

export default axiosService;