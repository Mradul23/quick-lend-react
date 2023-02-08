import axiosService from "../services/axiosBase";
import useAuth from "./authContextHook";

const useRefreshToken = async () => {
	const { setUser } = useAuth();
	return axiosService("/api/refresh", {
		method: "GET",
		withCredentials: true,
	})
		.then((data) => {
			setUser(data.data.user);
			return data.data.user;
		})
		.catch((err) => {
			console.log(err);
		});
};

export default useRefreshToken;
