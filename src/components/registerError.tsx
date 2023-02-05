import { PropsWithChildren } from "react";
import { RegistrationErrors } from "../models/loginRegisterErrorModels";
import "../index.css";

export default function RegisterErrorComponent({
	errorState,
	userIsRegistering,
}: PropsWithChildren<{
	errorState: RegistrationErrors;
	userIsRegistering: boolean;
}>): JSX.Element {
	return (
		<>
			<div
				className={`flex justify-center items-center border-white mr-3 mt-5 p-3 border-t error-div 
								${errorState.registerUsername && userIsRegistering ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid username.
					<br />
					Must be 4-24 characters long, contain only letters, numbers, and
					underscores, and start with a letter.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mr-3 mt-5 p-3 border-t error-div 
								${errorState.registerPassword && userIsRegistering ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid password.
					<br />
					Must be 8-24 characters long, contain at least one uppercase letter,
					one lowercase letter, one number, and one special character.
				</p>
			</div>
			<div
				className={`flex justify-center items-center border-white mr-3 mt-5 p-3 border-t error-div 
								${errorState.passwordMatch && userIsRegistering ? "visible" : ""}`}
			>
				<p className="text-white text-center">Passwords do not match.</p>
			</div>
		</>
	);
}
