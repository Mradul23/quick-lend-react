import { useEffect, useState, useReducer } from "react";
import { register } from "../services/auth";
import {
	RegistrationErrors,
	ErrorAction,
} from "../models/loginRegisterErrorModels";
import RegisterErrorComponent from "./registerError";
import "../index.css";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../customHooks/authHook";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^\d{10}$/;

const initialErrorState = {
	registerUsername: false,
	registerPassword: false,
	passwordMatch: false,
	registerPhoneNumber: false,
};

const errorReducer = (
	state: RegistrationErrors,
	action: ErrorAction
): RegistrationErrors => {
	switch (action.type) {
		case "resetAllErrors":
			state.registerUsername = false;
			state.registerPassword = false;
			state.passwordMatch = false;
			state.registerPhoneNumber = false;
			return { ...state };
		case "setRegisterUsernameError":
			state.registerUsername = true;
			return { ...state };
		case "setRegisterPasswordError":
			state.registerPassword = true;
			return { ...state };
		case "setPasswordMatchError":
			state.passwordMatch = true;
			return { ...state };
		case "setRegisterPhoneNumberError":
			state.registerPhoneNumber = true;
			return { ...state };
		default:
			return state;
	}
};

export default function RegisterComponent() {
	const { setUser } = useAuth();

	const [errorState, dispatchError] = useReducer(
		errorReducer,
		initialErrorState
	);

	const [requestInProgress, setRequestInProgress] = useState(false);

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
	const [registerFirstName, setRegisterFirstName] = useState("");
	const [registerLastName, setRegisterLastName] = useState("");
	const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");

	useEffect(() => {
		dispatchError({
			type: "resetAllErrors",
		});
		let validRegisterUsername = USER_REGEX.test(registerUsername);
		if (!validRegisterUsername && registerUsername.length > 0) {
			dispatchError({
				type: "setRegisterUsernameError",
			});
		}
		let validRegisterPassword = PWD_REGEX.test(registerPassword);
		if (!validRegisterPassword && registerPassword.length > 0) {
			dispatchError({
				type: "setRegisterPasswordError",
			});
		}
		let validPasswordMatch = registerPassword === registerConfirmPassword;
		if (!validPasswordMatch && validRegisterPassword) {
			dispatchError({
				type: "setPasswordMatchError",
			});
		}
		let validRegisterPhoneNumber = PHONE_REGEX.test(registerPhoneNumber);
		if (!validRegisterPhoneNumber && registerPhoneNumber.length > 0) {
			dispatchError({
				type: "setRegisterPhoneNumberError",
			});
		}
	}, [
		registerUsername,
		registerPassword,
		registerConfirmPassword,
		registerPhoneNumber,
	]);

	useEffect(() => {
		dispatchError({
			type: "resetAllErrors",
		});
	}, []);

	const navigateTo = useNavigate();

	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			errorState.registerUsername ||
			errorState.registerPassword ||
			errorState.passwordMatch
		) {
			return;
		}
		setRequestInProgress(true);
		register({
			registerEmail,
			registerUsername,
			registerPassword,
			registerFirstName,
			registerLastName,
			registerPhoneNumber,
		}).then((data) => {
			setRequestInProgress(false);
			if (data.status === 201) {
				setUser(data.data.user);
				navigateTo("/dashboard");
			} else {
				window.alert(data.response.data);
			}
		});
	};

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full register-page mt-8">
				<div className="wrapper flex flex-row justify-center items-start w-full">
					<div className="flex flex-col justify-center items-center w-3/5">
						<h1 className="font-thin text-2xl text-fuchsia-200 mb-3">
							REGISTER
						</h1>
						<form
							className=" w-full register-details-grid register-form"
							onSubmit={handleRegister}
						>
							<div className="grid grid-cols-4">
								<label htmlFor="register-email">Email</label>
								<input
									type="email"
									name="email"
									id="register-email"
									value={registerEmail}
									autoComplete="off"
									onChange={(e) => setRegisterEmail(e.target.value)}
									required
								/>
								<label htmlFor="username">Username</label>
								<input
									type="text"
									name="username"
									id="username"
									value={registerUsername}
									autoComplete="off"
									onChange={(e) => setRegisterUsername(e.target.value)}
									required
								/>
								<label htmlFor="register-password">Password</label>
								<input
									type="password"
									name="password"
									id="register-password"
									value={registerPassword}
									autoComplete="off"
									onChange={(e) => setRegisterPassword(e.target.value)}
									required
								/>
								<label htmlFor="register-confirmPassword">
									Confirm Password
								</label>
								<input
									type="password"
									name="confirmPassword"
									id="register-confirmPassword"
									value={registerConfirmPassword}
									autoComplete="off"
									onChange={(e) => setRegisterConfirmPassword(e.target.value)}
									required
								/>
								<label htmlFor="firstName">First Name</label>
								<input
									type="text"
									name="firstName"
									id="firstName"
									value={registerFirstName}
									onChange={(e) => setRegisterFirstName(e.target.value)}
									required
								/>
								<label htmlFor="lastName">Last Name</label>
								<input
									type="text"
									name="lastName"
									id="lastName"
									value={registerLastName}
									onChange={(e) => setRegisterLastName(e.target.value)}
									required
								/>
								<label htmlFor="phoneNumber">Phone Number</label>
								<input
									type="tel"
									name="phoneNumber"
									id="phoneNumber"
									value={registerPhoneNumber}
									onChange={(e) => setRegisterPhoneNumber(e.target.value)}
									required
								/>
								<br />
							</div>
							<div className="flex flex-col items-center">
								<button
									type="submit"
									className="register-button"
									disabled={
										requestInProgress ||
										errorState.passwordMatch ||
										errorState.registerPassword ||
										errorState.registerUsername ||
										errorState.registerPhoneNumber
									}
								>
									Register
								</button>
								<Link
									to="/login"
									className="register-login-link text-white mt-4"
								>
									Already have an account? Login
								</Link>
								<Link
									to="/"
									className="text-fuchsia-200 mt-4 back-to-landing-page-button"
								>
									Back to the Landing Page
								</Link>
							</div>
						</form>
						<RegisterErrorComponent registerErrors={errorState} />
					</div>
				</div>
			</main>
		</>
	);
}
