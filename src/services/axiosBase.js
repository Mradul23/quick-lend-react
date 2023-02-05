import axios from 'axios';

const axiosService = axios.create({
  baseURL: 'http://localhost:3000',
});

export default axiosService;