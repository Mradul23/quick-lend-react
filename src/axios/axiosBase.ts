import axios, { AxiosInstance } from "axios";

const URL = process.env.REACT_APP_EC2_INSTANCE_URL || "http://localhost:4000";

const axiosService: AxiosInstance = axios.create({
	baseURL: URL,
	withCredentials: true,
});

export const axiosPrivateService: AxiosInstance = axios.create({
	baseURL: URL,
	withCredentials: true,
});

export default axiosService;
