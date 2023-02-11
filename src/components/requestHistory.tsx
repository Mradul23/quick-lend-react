import { useEffect, useState } from "react";
import useFetchCommunityRequests from "../customHooksAndServices/fetchCommunityRequests";
import {
	RawBackendRequestData,
	FrontendUsableRequestData,
} from "../models/requestModels";
import RequestItem from "./requestItem";
import useAuth from "../customHooksAndServices/authContextHook";

export default function RequestHistory() {
	const { user } = useAuth();
	const { fetchRequests } = useFetchCommunityRequests();
	const [
		allInactiveRequestsPertainingToUser,
		setAllInactiveRequestsPertainingToUser,
	] = useState<FrontendUsableRequestData[]>();
	const [inactiveRequestsCreatedByUser, setInactiveRequestsCreatedByUser] =
		useState<FrontendUsableRequestData[]>();
	const [inactiveRequestsAcceptedByUser, setInactiveRequestsAcceptedByUser] =
		useState<FrontendUsableRequestData[]>();
	const [requestsToBeDisplayed, setRequestsToBeDisplayed] =
		useState<FrontendUsableRequestData[]>();

	useEffect(() => {
		if (requestsToBeDisplayed) {
			return;
		}
		fetchRequests()
			.then((data) => {
				const rawRequestArray: RawBackendRequestData[] = data.data;
				const requestArray: FrontendUsableRequestData[] = rawRequestArray.map(
					(request) => {
						return {
							_id: request._id,
							createdAt: request.createdAt,
							creatorUsername: request.creatorUsername,
							acceptorUsername: request.acceptorUsername,
							requestDescription: request.requestDescription,
							location: request.location,
							requestLatitude: request.requestLatitude,
							requestLongitude: request.requestLongitude,
							community: request.community,
							completed: request.completed,
							cancelled: request.cancelled,
						};
					}
				);
				const inactiveRequests = requestArray.filter(
					(request) => request.completed || request.cancelled
				);
				const inactiveRequestsPertainingToUser = inactiveRequests.filter(
					(request) =>
						request.creatorUsername === user.username ||
						request.acceptorUsername === user.username
				);
				const inactiveRequestsCreatedByUser =
					inactiveRequestsPertainingToUser.filter(
						(request) => request.creatorUsername === user.username
					);
				const inactiveRequestsAcceptedByUser =
					inactiveRequestsPertainingToUser.filter(
						(request) => request.acceptorUsername === user.username
					);
				setAllInactiveRequestsPertainingToUser(
					inactiveRequestsPertainingToUser
				);
				setInactiveRequestsCreatedByUser(inactiveRequestsCreatedByUser);
				setInactiveRequestsAcceptedByUser(inactiveRequestsAcceptedByUser);
				setRequestsToBeDisplayed(allInactiveRequestsPertainingToUser);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	if (!allInactiveRequestsPertainingToUser) {
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
					Request history
				</h1>
				<select
					className="w-1/2 mb-6 bg-transparent p-4 text-2xl text-white"
					onChange={(e) => {
						if (e.target.value === "all") {
							setRequestsToBeDisplayed(allInactiveRequestsPertainingToUser);
						} else if (e.target.value === "created") {
							setRequestsToBeDisplayed(inactiveRequestsCreatedByUser);
						} else if (e.target.value === "accepted") {
							setRequestsToBeDisplayed(inactiveRequestsAcceptedByUser);
						}
					}}
				>
					<option value="all" selected>
						All
					</option>
					<option value="created">Requests I created</option>
					<option value="accepted">Requests I accepted</option>
				</select>
				<div className="flex flex-col items-center w-1/2">
					{requestsToBeDisplayed && requestsToBeDisplayed.length > 0 ? (
						requestsToBeDisplayed.map((request, ind) => {
							return <RequestItem key={ind} request={request} />;
						})
					) : (
						<h2 className="font-bold text-2xl mt-20 text-white">
							No matching requests
						</h2>
					)}
				</div>
			</div>
		</>
	);
}
