import { LoginErrors } from "../models/loginRegisterErrorModels";
import "../index.css";

export default function LoginErrorComponent(props: {
	loginErrors: LoginErrors;
	userIsLogginIn: boolean;
}): JSX.Element {
	const { loginErrors, userIsLogginIn } = props;
	return (
		<>
			<div
				className={`flex justify-center items-center border-white mr-3 mt-5 p-3 border-t error-div 
      ${loginErrors.loginPassword && userIsLogginIn ? "visible" : ""}`}
			>
				<p className="text-white text-center">
					Invalid password.
					<br />
					Must be 8-24 characters long, contain at least one uppercase letter,
					one lowercase letter, one number, and one special character.
				</p>
			</div>
		</>
	);
}
