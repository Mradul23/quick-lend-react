import { RegistrationErrors } from "../models/loginRegisterErrorModels";
import "../index.css";

export default function RegisterErrorComponent(props: {
	registerErrors: RegistrationErrors;
}): JSX.Element {
	const { registerErrors } = props;
	return (
		<>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div ${
					registerErrors.registerEmail ? "visible" : ""
				}`}
			>
				<p className="text-white text-center">
					Invalid email.
					<br />
					Please enter a valid email address.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div 
								${registerErrors.registerUsername ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid username.
					<br />
					Must be 4-24 characters long, contain only letters, numbers, and
					underscores, and start with a letter.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div 
								${registerErrors.registerPassword ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid password.
					<br />
					Must be 8-24 characters long, contain at least one uppercase letter,
					one lowercase letter, one number, and one special character.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div 
								${registerErrors.passwordMatch ? "visible" : ""}`}
			>
				<p className="text-white text-center">Passwords do not match.</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mt-5 p-3 border-t error-div
								${registerErrors.registerPhoneNumber ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid phone number.
					<br />
					Must be 10 digits long and contain only numbers.
				</p>
			</div>
		</>
	);
}
