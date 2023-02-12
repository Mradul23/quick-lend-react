import { FrontendUsableRequestData } from "../models/requestModels";
import "../componentSpecificStyles/requestItemStyles.css";
import { Link } from "react-router-dom";
import ListItemTransitionVariants from "../framerMotionVariants.ts/listItemTransitionVariants";
import { motion } from "framer-motion";

export default function RequestItem({
	request,
}: {
	request: FrontendUsableRequestData;
}) {
	return (
		<motion.div
			className="outer-div"
			variants={ListItemTransitionVariants}
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
		>
			<Link to={`/request-details/${request._id}`} className="enclosing-link">
				<div className="flex flex-row items-center w-full justify-between">
					<h1 className="font-bold text-2xl text-white">
						{request.requestDescription}
					</h1>
					<h2 className="font-bold text-lg text-white">
						{request.creatorUsername}
					</h2>
				</div>
				<div className="flex flex-row items-center w-full justify-between">
					<div className="request-location-text w-1/2">
						<h1 className="font-bold text-lg text-white overflow-hidden text-ellipsis whitespace-nowrap">
							{request.location}
						</h1>
					</div>
					<div>
						<h2 className="font-bold text-lg text-white">
							(
							{request.acceptorUsername
								? `Accepted by ${request.acceptorUsername}`
								: "Yet to be accepted"}
							)
						</h2>
					</div>
				</div>
			</Link>
		</motion.div>
	);
}
