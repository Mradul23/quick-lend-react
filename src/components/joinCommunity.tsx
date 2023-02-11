import { useEffect, useState } from "react";
import useFetchCommunities from "../customHooksAndServices/fetchCommunities";
import {
	BackendCommunityData,
	FrontendUsableCommunityData,
} from "../models/communityModels";
import CommunityItem from "./communityItem";

export default function JoinACommunity() {
	const [latitude, setLatitude] = useState<number | null>(null);
	const [longitude, setLongitude] = useState<number | null>(null);
	const [Loading, setLoading] = useState<boolean>(false);
	const { fetchCommunities } = useFetchCommunities();
	const [communities, setCommunities] =
		useState<FrontendUsableCommunityData[]>();

	useEffect(() => {
		setLoading(true);
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLatitude(position.coords.latitude);
				setLongitude(position.coords.longitude);
				setLoading(false);
			},
			(err) => {
				setLoading(false);
				if (err.code === err.PERMISSION_DENIED) {
					alert(
						"Please enable location services. Reload the page and try again if you are not prompted to enable location services."
					);
				}
			}
		);
	}, []);

	useEffect(() => {
		if (communities) {
			return;
		}
		fetchCommunities()
			.then((response) => {
				const backendCommunitiesData: BackendCommunityData[] =
					response.data.communities;
				const frontendUsableCommunityData: FrontendUsableCommunityData[] =
					backendCommunitiesData.map((community) => {
						return {
							communityId: community.communityId,
							communityName: community.communityName,
							communityLatitude: community.communityLatitude,
							communityLongitude: community.communityLongitude,
							communityDescription: community.communityDescription,
						};
					});
				setCommunities(frontendUsableCommunityData);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	if (Loading || !communities) {
		return (
			<div className="flex flex-col items-center font-bold text-5xl mt-20 mb-6 text-white">
				<p>Loading...</p>
			</div>
		);
	}

	if (!latitude || !longitude) {
		return (
			<div className="flex flex-col items-center">
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
					Coordinates could not be retrieved.
				</h1>
				<p className="font-light text-3xl mb-10 text-fuchsia-200 text-center">
					Make sure you have location services enabled and try again later.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-col items-center">
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
					Available communites
				</h1>
				<p className="font-light text-3xl mb-10 text-fuchsia-200 text-center">
					(Sorted in increasing order of distance from your location)
				</p>
				<div className="flex flex-col items-center w-1/2">
					{communities &&
						communities.map((community, id) => {
							return <CommunityItem key={id} community={community} />;
						})}
				</div>
			</div>
		</>
	);
}
