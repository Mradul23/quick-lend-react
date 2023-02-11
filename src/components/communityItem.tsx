import { FrontendUsableCommunityDataWithDistance } from "../models/communityModels";
import useJoinCommunity from "../customHooksAndServices/joinCommunityHook";
import useAuth from "../customHooksAndServices/authContextHook";
import "../componentSpecificStyles/communityItemStyles.css";
import { useNavigate } from "react-router-dom";

export default function CommunityItem({
	community,
}: {
	community: FrontendUsableCommunityDataWithDistance;
}) {
	const { joinCommunity } = useJoinCommunity();
	const { user, setUser } = useAuth();
	const navigateTo = useNavigate();

	const handleJoinCommunity = () => {
		joinCommunity(community.communityId)
			.then((response) => {
				if (response.status === 200) {
					setUser(response.data.updatedUser);
					navigateTo("/community-joined-successfully");
				} else {
					alert(response.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<>
			<div className="border-white border-2 w-full mt-4 p-4 flex flex-row justify-between">
				<div className="flex flex-col items-start h-full justify-between w-3/5">
					<h1 className="font-bold text-3xl text-fuchsia-900">
						{community.communityName}{" "}
						<span className="text-base">
							({community.distance.toFixed(2)} km)
						</span>
					</h1>
					<h2 className="font-bold text-white text-base text-ellipsis overflow-hidden w-full">
						{community.communityDescription}
					</h2>
				</div>
				<div className="flex flex-col justify-between items-end w-1/3">
					<button
						className="mb-4 border-2 border-white hover:bg-white hover:text-fuchsia-700 text-white font-bold py-2 px-4 transition-colors w-3/5"
						onClick={handleJoinCommunity}
						disabled={community.communityId === user.community}
					>
						Join community
					</button>
					<button className="border-2 border-white hover:bg-white hover:text-fuchsia-700 text-white font-bold py-2 px-4 transition-colors w-3/5">
						View on map
					</button>
				</div>
			</div>
		</>
	);
}
