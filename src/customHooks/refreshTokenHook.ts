import axiosService from "../services/axiosBase";
import useAuth from "./authContextHook";

const useRefreshToken = () => {
	const { setUser } = useAuth();

	const refreshToken = async () => {
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

	return refreshToken;
};

export default useRefreshToken;
