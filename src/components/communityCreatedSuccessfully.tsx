import { Link } from "react-router-dom";

export default function CommunityCreatedSuccessfully() {
	return (
		<div className="flex flex-col items-center">
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
				Community created successfully
			</h1>
			<Link to="/dashboard">
				<button className="hover:bg-white hover:text-fuchsia-700 text-white font-bold p-4 transition-colors mt-8 border-2">
					Back to dashboard
				</button>
			</Link>
		</div>
	);
}
