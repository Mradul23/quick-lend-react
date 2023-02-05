export interface LoginErrors {
	loginPassword: boolean;
}

export interface RegistrationErrors {
	registerUsername: boolean;
	registerPassword: boolean;
	passwordMatch: boolean;
}

export interface GroupedErrorState extends LoginErrors, RegistrationErrors {}

export interface ErrorAction {
	type:
		| "resetAllErrors"
		| "setLoginPasswordError"
		| "setRegisterUsernameError"
		| "setRegisterPasswordError"
		| "setPasswordMatchError";
}
