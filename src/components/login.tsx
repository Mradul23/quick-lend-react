import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../customHooks/authHook";
import { login } from "../services/auth";
import LoginErrorComponent from "./loginError";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function LoginComponent() {
	const { setUser } = useAuth();
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [loginPasswordError, setLoginPasswordError] = useState(false);
	const [requestInProgress, setRequestInProgress] = useState(false);

	useEffect(() => {
		setLoginPasswordError(false);
		let validLoginPassword = PWD_REGEX.test(loginPassword);
		if (!validLoginPassword && loginPassword.length > 0) {
			setLoginPasswordError(true);
		}
	}, [loginPassword]);

	const navigateTo = useNavigate();

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		setRequestInProgress(true);
		e.preventDefault();
		if (loginPasswordError) {
			return;
		}
		login({ loginEmail, loginPassword }).then((data) => {
			setRequestInProgress(false);
			if (data.status === 200) {
				setUser(data.data.user);
				navigateTo("/dashboard");
			} else {
				window.alert(data.response.data);
			}
		});
	};

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full login-page mt-8">
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
							<button
								type="submit"
								className="login-button"
								disabled={requestInProgress}
							>
								Login
							</button>
							<Link to="/register" className="text-fuchsia-200 mt-4">
								Don't have an account yet? Register
							</Link>
							<Link to="/" className="text-fuchsia-200 mt-4 back-to-landing-page-button">
								Back to the Landing Page
							</Link>
						</form>
						<LoginErrorComponent loginPasswordError={loginPasswordError} />
					</div>
				</div>
			</main>
		</>
	);
}
