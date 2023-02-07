import axiosService from "../services/axiosBase";
import { registerCredentials } from "../models/credentialModels";

export default async function register(credentials: registerCredentials) {
	return axiosService("/api/user/register", {
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
