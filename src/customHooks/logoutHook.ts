import axiosService from "../services/axiosBase";

export async function logout() {
	return axiosService("/api/user/logout", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return err;
		});
}
