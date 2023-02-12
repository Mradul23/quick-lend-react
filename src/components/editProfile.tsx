import { useEffect, useState, useReducer } from "react";
import {
	EditProfileErrorAction,
	EditProfileErrors,
	EditProperties,
} from "../models/editProfileModels";
import "../componentSpecificStyles/editProfileStyles.css";
import useAuth from "../customHooksAndServices/authContextHook";
import useEditProfile from "../customHooksAndServices/editProfileHook";
import { FaCheck } from "react-icons/fa";
import PageTransitionVariants from "../framerMotionVariants.ts/pageTransitionVariants";
import { motion } from "framer-motion";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^\d{10}$/;
const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,4}$/;

const initialErrorState = {
	editEmail: false,
	editPassword: false,
	editPhoneNumber: false,
};

const errorReducer = (
	state: EditProfileErrors,
	action: EditProfileErrorAction
): EditProfileErrors => {
	switch (action.type) {
		case "resetAllErrors":
			state.editPassword = false;
			state.editPhoneNumber = false;
			state.editEmail = false;
			return { ...state };
		case "setEditEmailError":
			state.editEmail = true;
			return { ...state };
		case "setEditPasswordError":
			state.editPassword = true;
			return { ...state };
		case "setEditPhoneNumberError":
			state.editPhoneNumber = true;
			return { ...state };
		default:
			return state;
	}
};

export default function EditProfile() {
	const { setUser } = useAuth();
	const { editProfileInfo } = useEditProfile();

	const [errorState, dispatchError] = useReducer(
		errorReducer,
		initialErrorState
	);

	const [requestInProgress, setRequestInProgress] = useState(false);

	const [editEmail, setEditEmail] = useState("");
	const [displayEmailChangeSuccess, setDisplayEmailChangeSuccess] =
		useState(false);
	const [editPassword, setEditPassword] = useState("");
	const [displayPasswordChangeSuccess, setDisplayPasswordChangeSuccess] =
		useState(false);
	const [editFirstName, setEditFirstName] = useState("");
	const [displayFirstNameChangeSuccess, setDisplayFirstNameChangeSuccess] =
		useState(false);
	const [editLastName, setEditLastName] = useState("");
	const [displayLastNameChangeSuccess, setDisplayLastNameChangeSuccess] =
		useState(false);
	const [editPhoneNumber, setEditPhoneNumber] = useState("");
	const [displayPhoneNumberChangeSuccess, setDisplayPhoneNumberChangeSuccess] =
		useState(false);

	useEffect(() => {
		dispatchError({
			type: "resetAllErrors",
		});
		let validEditEmail = EMAIL_REGEX.test(editEmail);
		if (!validEditEmail && editEmail.length > 0) {
			dispatchError({
				type: "setEditEmailError",
			});
		}
		let validEditPassword = PWD_REGEX.test(editPassword);
		if (!validEditPassword && editPassword.length > 0) {
			dispatchError({
				type: "setEditPasswordError",
			});
		}

		let validEditPhoneNumber = PHONE_REGEX.test(editPhoneNumber);
		if (!validEditPhoneNumber && editPhoneNumber.length > 0) {
			dispatchError({
				type: "setEditPhoneNumberError",
			});
		}
	}, [editPassword, editPhoneNumber, editEmail]);

	const handleEmailUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRequestInProgress(true);
		if (errorState.editEmail) {
			setRequestInProgress(false);
			return;
		}

		setRequestInProgress(false);
		const response = await editProfileInfo({
			editProperty: EditProperties.email,
			editValue: editEmail,
		});
		if (response.status === 200) {
			setUser(response.data.user);
			setDisplayEmailChangeSuccess(true);
			setTimeout(() => {
				setDisplayEmailChangeSuccess(false);
			}, 1500);
		} else {
			window.alert(response.response.data.message);
		}
	};

	const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRequestInProgress(true);
		if (errorState.editPassword) {
			setRequestInProgress(false);
			return;
		}

		const response = await editProfileInfo({
			editProperty: EditProperties.password,
			editValue: editPassword,
		});

		setRequestInProgress(false);
		if (response.status === 200) {
			setUser(response.data.user);
			setDisplayPasswordChangeSuccess(true);
			setTimeout(() => {
				setDisplayPasswordChangeSuccess(false);
			}, 1500);
		} else {
			window.alert(response.response.data.message);
		}
	};

	const handleFirstNameUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRequestInProgress(true);

		const response = await editProfileInfo({
			editProperty: EditProperties.firstName,
			editValue: editFirstName,
		});

		setRequestInProgress(false);
		if (response.status === 200) {
			setUser(response.data.user);
			setDisplayFirstNameChangeSuccess(true);
			setTimeout(() => {
				setDisplayFirstNameChangeSuccess(false);
			}, 1500);
		} else {
			window.alert(response.response.data.message);
		}
	};

	const handleLastNameUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setRequestInProgress(true);

		const response = await editProfileInfo({
			editProperty: EditProperties.lastName,
			editValue: editLastName,
		});

		setRequestInProgress(false);
		if (response.status === 200) {
			setUser(response.data.user);
			setDisplayLastNameChangeSuccess(true);
			setTimeout(() => {
				setDisplayLastNameChangeSuccess(false);
			}, 1500);
		} else {
			window.alert(response.response.data.message);
		}
	};

	const handlePhoneNumberUpdate = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		setRequestInProgress(true);
		if (errorState.editPhoneNumber) {
			setRequestInProgress(false);
			return;
		}

		const response = await editProfileInfo({
			editProperty: EditProperties.phoneNumber,
			editValue: editPhoneNumber,
		});

		setRequestInProgress(false);
		if (response.status === 200) {
			setUser(response.data.user);
			setDisplayPhoneNumberChangeSuccess(true);
			setTimeout(() => {
				setDisplayPhoneNumberChangeSuccess(false);
			}, 1500);
		} else {
			window.alert(response.response.data.message);
		}
	};

	return (
		<>
			<main className="flex flex-col justify-center items-center w-full edit-page">
				<motion.div
					className="wrapper flex flex-row justify-center items-start w-full"
					variants={PageTransitionVariants}
					initial="initial"
					animate="animate"
					exit="exit"
				>
					<div className="flex flex-col justify-center items-center forms-container">
						<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
							Edit your profile
						</h1>
						<form className=" w-full" onSubmit={handleEmailUpdate}>
							<div className="input-set">
								<label>Email</label>
								<div className="flex flex-row">
									<input
										type="email"
										value={editEmail}
										onChange={(e) => setEditEmail(e.target.value)}
										placeholder="Enter a new email"
									/>
									<button
										type="submit"
										disabled={
											requestInProgress ||
											errorState.editEmail ||
											!editEmail ||
											displayEmailChangeSuccess
										}
									>
										Update
									</button>

									<FaCheck
										className={`change-success-check-mark ${
											displayEmailChangeSuccess ? "show-check" : ""
										}`}
									/>
								</div>
								{errorState.editEmail && (
									<p className="text-white text-xs italic">
										Please enter a valid email address.
									</p>
								)}
							</div>
						</form>
						<form className=" w-full" onSubmit={handlePasswordUpdate}>
							<div className="input-set">
								<label>Password</label>
								<div className="flex flex-row">
									<input
										className=""
										type="password"
										value={editPassword}
										onChange={(e) => setEditPassword(e.target.value)}
										placeholder="Enter a new password"
									/>
									<button
										type="submit"
										disabled={
											requestInProgress ||
											errorState.editPassword ||
											!editPassword ||
											displayPasswordChangeSuccess
										}
									>
										Update
									</button>
									<FaCheck
										className={`change-success-check-mark ${
											displayPasswordChangeSuccess ? "show-check" : ""
										}`}
									/>
								</div>
								{errorState.editPassword && (
									<p className="text-white text-xs italic">
										Please enter a valid password.
									</p>
								)}
							</div>
						</form>
						<form className=" w-full" onSubmit={handleFirstNameUpdate}>
							<div className="input-set">
								<label>First Name</label>
								<div className="flex flex-row">
									<input
										type="text"
										value={editFirstName}
										onChange={(e) => setEditFirstName(e.target.value)}
										placeholder="Enter a new first name"
									/>
									<button
										type="submit"
										disabled={
											requestInProgress ||
											!editFirstName ||
											displayFirstNameChangeSuccess
										}
									>
										Update
									</button>
									<FaCheck
										className={`change-success-check-mark ${
											displayFirstNameChangeSuccess ? "show-check" : ""
										}`}
									/>
								</div>
							</div>
						</form>
						<form className=" w-full" onSubmit={handleLastNameUpdate}>
							<div className="input-set">
								<label>Last Name</label>
								<div className="flex flex-row">
									<input
										type="text"
										value={editLastName}
										onChange={(e) => setEditLastName(e.target.value)}
										placeholder="Enter a new last name"
									/>
									<button
										type="submit"
										disabled={
											requestInProgress ||
											!editLastName ||
											displayLastNameChangeSuccess
										}
									>
										Update
									</button>
									<FaCheck
										className={`change-success-check-mark ${
											displayLastNameChangeSuccess ? "show-check" : ""
										}`}
									/>
								</div>
							</div>
						</form>
						<form className=" w-full" onSubmit={handlePhoneNumberUpdate}>
							<div className="input-set">
								<label>Phone Number</label>
								<div className="flex flex-row">
									<input
										type="text"
										value={editPhoneNumber}
										onChange={(e) => setEditPhoneNumber(e.target.value)}
										placeholder="Enter a new phone number"
									/>
									<button
										type="submit"
										disabled={
											requestInProgress ||
											errorState.editPhoneNumber ||
											!editPhoneNumber ||
											displayPhoneNumberChangeSuccess
										}
									>
										Update
									</button>
									<FaCheck
										className={`change-success-check-mark ${
											displayPhoneNumberChangeSuccess ? "show-check" : ""
										}`}
									/>
								</div>
								{errorState.editPhoneNumber && (
									<p className="text-white text-xs italic">
										Please enter a valid phone number.
									</p>
								)}
							</div>
						</form>
					</div>
				</motion.div>
			</main>
		</>
	);
}
