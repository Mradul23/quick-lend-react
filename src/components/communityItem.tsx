import { FrontendUsableCommunityDataWithDistance } from "../models/communityModels";

export default function CommunityItem({
	community,
}: {
	community: FrontendUsableCommunityDataWithDistance;
}) {
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
					<button className="mb-4 border-2 border-white hover:bg-white hover:text-fuchsia-700 text-white font-bold py-2 px-4 transition-colors w-3/5">
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
