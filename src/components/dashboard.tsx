import useAuth from "../customHooksAndServices/authContextHook";
import "../componentSpecificStyles/dashboardStyles.css";
import { Link } from "react-router-dom";

export default function DashboardComponent() {
	const { user } = useAuth();

	const community = user.community;
	return (
		<div className="flex flex-col items-center">
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
				Hello {user.firstName}!
			</h1>
			<p className="font-light text-3xl mb-10 text-fuchsia-200">
				Welcome to your dashboard.
			</p>
			<div className="flex flex-row justify-center button-container">
				<Link to={community ? "/active-requests" : "/join-community"}>
					<button>View active community requests</button>
				</Link>
				<Link to={community ? "/new-request" : "/join-community"}>
					<button className="ml-4">Create a new request</button>
				</Link>
			</div>
		</div>
	);
}
