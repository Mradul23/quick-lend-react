import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../customHooksAndServices/authContextHook";
import useLogin from "../customHooksAndServices/loginHook";
import LoginErrorComponent from "./loginError";

const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function LoginComponent() {
	const { setUser } = useAuth();
	const { login } = useLogin();
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const [loginEmailError, setLoginEmailError] = useState(false);
	const [loginPasswordError, setLoginPasswordError] = useState(false);
	const [requestInProgress, setRequestInProgress] = useState(false);

	useEffect(() => {
		setLoginPasswordError(false);
		setLoginEmailError(false);
		let validLoginEmail = EMAIL_REGEX.test(loginEmail);
		if (!validLoginEmail && loginEmail.length > 0) {
			setLoginEmailError(true);
		}
		let validLoginPassword = PWD_REGEX.test(loginPassword);
		if (!validLoginPassword && loginPassword.length > 0) {
			setLoginPasswordError(true);
		}
	}, [loginPassword, loginEmail]);

	const navigateTo = useNavigate();

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		setRequestInProgress(true);
		e.preventDefault();
		if (loginPasswordError || loginEmailError) {
			return;
		}
		const data = await login({ loginEmail, loginPassword });
		setRequestInProgress(false);
		if (data.status === 200) {
			setUser(data.data.user);
			navigateTo("/dashboard");
		} else {
			window.alert(data.response.data);
		}
	};

	return (
		<>
			<Link
				to="/"
				className="text-fuchsia-200 back-to-landing-page-button absolute ml-4 mt-4"
			>
				Back to the Landing Page
			</Link>
			<main className="flex flex-col justify-center items-center w-full login-page">
				<div className="wrapper flex flex-row justify-center items-start w-full">
					<div className="flex flex-col justify-center items-center w-1/4">
						<h1 className="font-thin text-2xl text-fuchsia-200 mb-3 mt-8">
							LOGIN
						</h1>
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
						</form>
						<LoginErrorComponent
							loginPasswordError={loginPasswordError}
							loginEmailError={loginEmailError}
						/>
					</div>
				</div>
			</main>
		</>
	);
}
