import { useState } from "react";
import { login, register } from "./services/auth";
import "./index.css";

export default function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [registerEmail, setRegisterEmail] = useState("");
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
	const [registerFirstName, setRegisterFirstName] = useState("");
	const [registerLastName, setRegisterLastName] = useState("");
	const [registerPhoneNumber, setRegisterPhoneNumber] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		login({ loginEmail, loginPassword }).then((data) => {
			console.log(data);
		});
	};

	const handleRegister = (e) => {
		e.preventDefault();
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
				<div className="wrapper flex flex-row justify-center items-center w-full">
					<div className="flex flex-col justify-center items-center w-1/4 border-r-4 mr-6">
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
								required
							/>
							<label htmlFor="login-password">Password</label>
							<input
								type="password"
								name="password"
								id="login-password"
								value={loginPassword}
								onChange={(e) => setLoginPassword(e.target.value)}
								required
							/>
							<button type="submit" className="login-button">
								Login
							</button>
						</form>
					</div>
					<div className="flex flex-col justify-center items-center w-3/5	">
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
								onChange={(e) => setRegisterEmail(e.target.value)}
								required
							/>
							<label htmlFor="username">Username</label>
							<input
								type="text"
								name="username"
								id="username"
								value={registerUsername}
								onChange={(e) => setRegisterUsername(e.target.value)}
								required
							/>
							<label htmlFor="register-password">Password</label>
							<input
								type="password"
								name="password"
								id="register-password"
								value={registerPassword}
								onChange={(e) => setRegisterPassword(e.target.value)}
								// onChange={}
								required
							/>
							<label htmlFor="register-confirmPassword">Confirm Password</label>
							<input
								type="password"
								name="confirmPassword"
								id="register-confirmPassword"
								value={registerConfirmPassword}
								onChange={(e) => setRegisterConfirmPassword(e.target.value)}
								// onChange={}
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
							<button type="submit" className="register-button">
								Register
							</button>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}
