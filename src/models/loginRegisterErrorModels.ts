export interface LoginErrors {
	loginPasswordError: boolean;
}

export interface RegistrationErrors {
	registerUsername: boolean;
	registerPassword: boolean;
	registerPhoneNumber: boolean;
	passwordMatch: boolean;
}

export interface ErrorAction {
	type:
		| "resetAllErrors"
		| "setRegisterUsernameError"
		| "setRegisterPasswordError"
		| "setPasswordMatchError"
		| "setRegisterPhoneNumberError"
}
