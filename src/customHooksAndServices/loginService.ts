import axiosService from "../services/axiosBase";
import { loginCredentials } from "../models/credentialModels";

export default async function login(credentials: loginCredentials) {
	return axiosService("/api/user/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		data: JSON.stringify(credentials),
	})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			return err;
		});
}
