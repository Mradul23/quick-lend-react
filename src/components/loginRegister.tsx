import { useEffect, useState, useReducer } from "react";
import { login, register } from "../services/auth";
import {
	GroupedErrorState,
	ErrorAction,
} from "../models/loginRegisterErrorModels";
import RegisterErrorComponent from "./registerError";
import LoginErrorComponent from "./loginError";
import "../index.css";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const initialErrorState = {
	loginPassword: false,
	registerUsername: false,
	registerPassword: false,
	passwordMatch: false,
};

const errorReducer = (
	state: GroupedErrorState,
	action: ErrorAction
): GroupedErrorState => {
	switch (action.type) {
		case "resetAllErrors":
			state.loginPassword = false;
			state.registerUsername = false;
			state.registerPassword = false;
			state.passwordMatch = false;
			return { ...state };
		case "setLoginPasswordError":
			state.loginPassword = true;
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
		default:
			return state;
	}
};

export default function LoginRegisterComponent() {
	const [errorState, dispatchError] = useReducer(
		errorReducer,
		initialErrorState
	);

	const [registerFocus, setRegisterFocus] = useState(false);

	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

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
		let validLoginPassword = PWD_REGEX.test(loginPassword);
		if (!validLoginPassword && loginPassword.length > 0) {
			dispatchError({
				type: "setLoginPasswordError",
			});
		}
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
	}, [
		loginPassword,
		registerUsername,
		registerPassword,
		registerConfirmPassword,
	]);

	useEffect(() => {
		dispatchError({
			type: "resetAllErrors",
		});
	}, []);

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRegisterFocus(false);
		if (errorState.loginPassword) {
			return;
		}
		login({ loginEmail, loginPassword }).then((data) => {
			console.log(data);
		});
	};

	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRegisterFocus(true);
		if (
			errorState.registerUsername ||
			errorState.registerPassword ||
			errorState.passwordMatch
		) {
			return;
		}
		register({
			registerEmail,
			registerUsername,
			registerPassword,
			registerFirstName,
			registerLastName,
			registerPhoneNumber,
		}).then((data) => {
			console.log(data);
		});
	};

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full login-register-page">
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
					Quick Lend
				</h1>
				<p className="font-light text-3xl mb-10 text-fuchsia-200">
					Quickly borrow/lend general utilities within a localized community!
				</p>
				<div className="wrapper flex flex-row justify-center items-start w-full">
					<div className="flex flex-col justify-center items-center w-1/4">
						<h1 className="font-thin text-2xl text-fuchsia-200 mb-3">LOGIN</h1>
						<form
							className="flex flex-col justify-center items-center login-form"
							onSubmit={handleLogin}
						>
							<label htmlFor="login-email">Email</label>
							<input
								type="email"
								name="email"
								id="login-email"
								value={loginEmail}
								onChange={(e) => setLoginEmail(e.target.value)}
								onFocus={() => setRegisterFocus(false)}
								required
							/>
							<label htmlFor="login-password">Password</label>
							<input
								type="password"
								name="password"
								id="login-password"
								value={loginPassword}
								onChange={(e) => setLoginPassword(e.target.value)}
								onFocus={() => setRegisterFocus(false)}
								required
							/>
							<button type="submit" className="login-button">
								Login
							</button>
						</form>
						<LoginErrorComponent
							errorState={errorState}
							userIsLogginIn={!registerFocus}
						/>
					</div>
					<div className="flex flex-col justify-center items-center w-3/5	border-l-4 ml-6 pl-6">
						<h1 className="font-thin text-2xl text-fuchsia-200 mb-3">
							REGISTER
						</h1>
						<form
							className="grid grid-cols-4 w-full register-details-grid register-form"
							onSubmit={handleRegister}
						>
							<label htmlFor="register-email">Email</label>
							<input
								type="email"
								name="email"
								id="register-email"
								value={registerEmail}
								autoComplete="off"
								onChange={(e) => setRegisterEmail(e.target.value)}
								onFocus={() => setRegisterFocus(true)}
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
								onFocus={() => setRegisterFocus(true)}
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
								onFocus={() => setRegisterFocus(true)}
								required
							/>
							<label htmlFor="register-confirmPassword">Confirm Password</label>
							<input
								type="password"
								name="confirmPassword"
								id="register-confirmPassword"
								value={registerConfirmPassword}
								autoComplete="off"
								onChange={(e) => setRegisterConfirmPassword(e.target.value)}
								onFocus={() => setRegisterFocus(true)}
								required
							/>
							<label htmlFor="firstName">First Name</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								value={registerFirstName}
								onChange={(e) => setRegisterFirstName(e.target.value)}
								onFocus={() => setRegisterFocus(true)}
								required
							/>
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								value={registerLastName}
								onChange={(e) => setRegisterLastName(e.target.value)}
								onFocus={() => setRegisterFocus(true)}
								required
							/>
							<label htmlFor="phoneNumber">Phone Number</label>
							<input
								type="tel"
								name="phoneNumber"
								id="phoneNumber"
								value={registerPhoneNumber}
								onChange={(e) => setRegisterPhoneNumber(e.target.value)}
								onFocus={() => setRegisterFocus(true)}
								required
							/>
							<br />
							<button type="submit" className="register-button">
								Register
							</button>
						</form>
						<RegisterErrorComponent
							errorState={errorState}
							userIsRegistering={registerFocus}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
