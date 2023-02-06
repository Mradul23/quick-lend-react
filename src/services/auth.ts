import axiosService from "./axiosBase";
import {
	loginCredentials,
	registerCredentials,
} from "../models/credentialModels";

export async function login(credentials: loginCredentials) {
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

export async function register(credentials: registerCredentials) {
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
