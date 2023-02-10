import "../componentSpecificStyles/newRequestStyles.css";
import { useState, useEffect } from "react";
import useCreateRequest from "../customHooksAndServices/createRequestHook";
import useAuth from "../customHooksAndServices/authContextHook";
import { useNavigate } from "react-router-dom";

export default function NewRequest() {
	const [requestDescription, setRequestDescription] = useState("");
	const [location, setLocation] = useState("");
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [coordinateRetrievalInProgress, setCoordinateRetrievalInProgress] =
		useState(false);
	const { createRequest } = useCreateRequest();
	const { user } = useAuth();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (latitude !== null && longitude !== null) {
			setCoordinateRetrievalInProgress(false);
		}
	}, [latitude, longitude]);

	const resetCoordinates = () => {
		setLatitude(null);
		setLongitude(null);
	};

	const handleCreateRequest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (requestDescription !== "" && location !== "") {
			const response = await createRequest({
				requestDescription: requestDescription,
				location: location,
				requestLatitude: latitude,
				requestLongitude: longitude,
				community: user.community,
			});
			if (response.status === 201) {
				navigateTo("/request-created-successfully");
			} else {
				alert("An error occurred while creating your request");
			}
		}
	};
	return (
		<>
			<div className="flex flex-col items-center">
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
					Create a new request
				</h1>
				<div className="flex flex-col items-center form-container w-3/5">
					<form
						className="mt-1 flex flex-col items-center w-full"
						onSubmit={handleCreateRequest}
					>
						<div className="flex flex-col items-center input-set">
							<label>Request Description</label>
							<input
								value={requestDescription}
								type="text"
								placeholder="Enter the request description (the item you wish for, etc.)"
								onChange={(e) => setRequestDescription(e.target.value)}
							/>
						</div>
						<div className="flex flex-col items-center input-set">
							<label>Location</label>
							<input
								value={location}
								type="text"
								placeholder="Enter a location within the community to deliver the item to"
								onChange={(e) => setLocation(e.target.value)}
							/>
						</div>
						<div className="flex flex-row w-full justify-between items-center">
							<label className="w-full">
								Attach current coordinates for reference
							</label>
							<input
								type="checkbox"
								className="scale-50 w-12"
								onChange={(e) => {
									if (!e.target.checked) {
										resetCoordinates();
									} else if (navigator.geolocation && e.target.checked) {
										navigator.geolocation.getCurrentPosition(
											(position) => {
												setCoordinateRetrievalInProgress(true);
												setLatitude(position.coords.latitude);
												setLongitude(position.coords.longitude);
											},
											(err) => {
												if (err.code === err.PERMISSION_DENIED) {
													alert(
														"Please enable location services. Reload the page and try again if you are not prompted to enable location services."
													);
													e.target.checked = false;
												}
											}
										);
									}
								}}
							/>
						</div>
						{latitude && (
							<p className="text-xs text-white mt-2">
								Note that the accuracy of the location retrieved depends on
								device hardware. It may not always be accurate enough to be
								useful. Please make sure the location description is clear
								enough by itself.
							</p>
						)}
						<button
							disabled={
								requestDescription === "" ||
								location === "" ||
								coordinateRetrievalInProgress
							}
						>
							<span>Submit</span>
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
