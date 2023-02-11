import { useEffect, useState } from "react";
import useFetchCommunityRequests from "../customHooksAndServices/fetchCommunityRequests";
import {
	RawBackendRequestData,
	FrontendUsableRequestData,
} from "../models/requestModels";
import RequestItem from "./requestItem";
import useAuth from "../customHooksAndServices/authContextHook";

export default function ActiveRequests() {
	const { user } = useAuth();
	const { fetchRequests } = useFetchCommunityRequests();
	const [allActiveRequests, setAllActiveRequests] =
		useState<FrontendUsableRequestData[]>();
	const [activeRequestsCreatedByUser, setActiveRequestsCreatedByUser] =
		useState<FrontendUsableRequestData[]>();
	const [activeRequestsAcceptedByUser, setActiveRequestsAcceptedByUser] =
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
				const activeRequests = requestArray.filter(
					(request) => !request.completed && !request.cancelled
				);
				const activeRequestsCreatedByUser = activeRequests.filter(
					(request) => request.creatorUsername === user.username
				);
				const activeRequestsAcceptedByUser = activeRequests.filter(
					(request) => request.acceptorUsername === user.username
				);
				setAllActiveRequests(activeRequests);
				setActiveRequestsCreatedByUser(activeRequestsCreatedByUser);
				setActiveRequestsAcceptedByUser(activeRequestsAcceptedByUser);
				setRequestsToBeDisplayed(allActiveRequests);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	if (!allActiveRequests) {
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
					Active Requests
				</h1>
				<select
					className="w-1/2 mb-6 bg-transparent p-4 text-2xl text-white"
					onChange={(e) => {
						if (e.target.value === "all") {
							setRequestsToBeDisplayed(allActiveRequests);
						} else if (e.target.value === "created") {
							setRequestsToBeDisplayed(activeRequestsCreatedByUser);
						} else if (e.target.value === "accepted") {
							setRequestsToBeDisplayed(activeRequestsAcceptedByUser);
						}
					}}
				>
					<option className="dropdown-option" value="all">
						All
					</option>
					<option className="dropdown-option" value="created">
						Requests I created
					</option>
					<option className="dropdown-option" value="accepted">
						Requests I accepted
					</option>
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
