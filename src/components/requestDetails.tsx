import { Params, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { RequestDetails } from "../models/requestModels";
import useFetchRequestDetails from "../customHooksAndServices/fetchRequestDetails";
import useAuth from "../customHooksAndServices/authContextHook";
import "../componentSpecificStyles/requestDetailsStyles.css";
import useRequestUpdate from "../customHooksAndServices/requestUpdateHook";

export default function RequestDetailsComponent() {
	const { user } = useAuth();
	const { updateRequest } = useRequestUpdate();
	const username = user.username;
	const { id } = useParams<Params>();
	const { fetchRequestDetails } = useFetchRequestDetails();
	const [requestDetails, setRequestDetails] = useState<RequestDetails>();
	const navigateTo = useNavigate();

	useEffect(() => {
		if (requestDetails) {
			return;
		}
		if (!id) {
			navigateTo("/dashboard");
			return;
		}
		fetchRequestDetails(id).then((response) => {
			setRequestDetails(response.data.data);
		});
	});

	const handleRequestDetailsUpdate = async (updateProperty: string) => {
		if (!requestDetails || !id) {
			return;
		}
		const response = await updateRequest({
			updateType: updateProperty,
			requestId: id,
		});
		if (response.status === 200) {
			console.log(response);
			window.location.reload();
		} else {
			alert(response.response.data);
		}
	};

	if (!requestDetails) {
		return (
			<div className="flex flex-col items-center font-bold text-5xl mt-20 mb-6 text-white">
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center">
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
					Request details{" "}
					<span className="text-lg">({requestDetails._id})</span>
				</h1>
				<div className="flex flex-col items-center">
					<div className="flex flex-col details-container">
						<p>
							<span>Description: </span>
							{requestDetails.requestDescription}
						</p>
						<p>
							<span>Request location: </span>
							{requestDetails.location}
						</p>
						<div className="secondary-details flex justify-evenly">
							<div className="request-properties">
								<p>
									<span>Creator username: </span>
									{requestDetails.creatorUsername}
								</p>
								<p>
									<span>Request accepted by: </span>
									{requestDetails.acceptorUsername
										? requestDetails.acceptorUsername
										: "-"}
								</p>
								<p>
									<span>Request status: </span>
									{requestDetails.completed
										? "Completed"
										: requestDetails.cancelled
										? "Cancelled"
										: "Open"}
								</p>
							</div>
							<div className="separator"></div>
							<div className="request-actions mt-16 flex flex-col">
								{!requestDetails.cancelled &&
									!requestDetails.completed &&
									!requestDetails.acceptorUsername &&
									requestDetails.creatorUsername !== username && (
										<button
											className="mt-4"
											onClick={(e) => {
												e.preventDefault();
												handleRequestDetailsUpdate("accept");
											}}
										>
											Accept
										</button>
									)}
								{!requestDetails.cancelled &&
									!requestDetails.completed &&
									requestDetails.acceptorUsername === username && (
										<button
											className="mt-4"
											onClick={(e) => {
												e.preventDefault();
												handleRequestDetailsUpdate("abandon");
											}}
										>
											Abandon
										</button>
									)}
								{!requestDetails.cancelled &&
									!requestDetails.completed &&
									requestDetails.acceptorUsername === username && (
										<a href={`tel:${requestDetails.contactNumber}`}>
											<button className="mt-4">
												Contact {requestDetails.creatorUsername}
											</button>
										</a>
									)}
								{!requestDetails.cancelled &&
									!requestDetails.completed &&
									requestDetails.creatorUsername === username &&
									requestDetails.acceptorUsername && (
										<a href={`tel:${requestDetails.contactNumber}`}>
											<button className="mt-4">
												Contact {requestDetails.acceptorUsername}
											</button>
										</a>
									)}
								{!requestDetails.cancelled &&
									!requestDetails.completed &&
									requestDetails.creatorUsername === username && (
										<button
											className="mt-4"
											onClick={(e) => {
												e.preventDefault();
												handleRequestDetailsUpdate("cancel");
											}}
										>
											Cancel request
										</button>
									)}
								{!requestDetails.cancelled &&
									!requestDetails.completed &&
									requestDetails.creatorUsername === username && (
										<button
											className="mt-4"
											onClick={(e) => {
												e.preventDefault();
												handleRequestDetailsUpdate("complete");
											}}
										>
											Mark as complete
										</button>
									)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
