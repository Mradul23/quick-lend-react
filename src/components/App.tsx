import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./login";
import RegisterComponent from "./register";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardComponent from "./dashboard";
import LandingPageComponent from "./landingPage";
import NotInACommunity from "./notInACommunity";
import SideMenuWrapper from "./sideMenuWrapper";
import EditProfile from "./editProfile";
import CommunityRequiredRoutes from "./communityRequiredRoutes";
import NewRequest from "./newRequest";
import ActiveRequests from "./activeRequests";
import RequestCreatedSuccessfully from "./requestCreatedSuccessfully";
import RequestHistory from "./requestHistory";
import RequestDetailsComponent from "./requestDetails";
import AdminRequiredRoutes from "./adminRequiredRoutes";
import CreateCommunity from "./createCommunity";
import CommunityCreatedSuccessfully from "./communityCreatedSuccessfully";
import JoinACommunity from "./joinCommunity";
import CommunityJoinedSuccessfully from "./communityJoinedSuccessfully";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPageComponent />} />
				<Route element={<ProtectedRoutes />}>
					<Route element={<SideMenuWrapper />}>
						<Route path="/dashboard" element={<DashboardComponent />} />
						<Route path="/not-in-community" element={<NotInACommunity />} />
						<Route path="/edit-profile" element={<EditProfile />} />
						<Route path="/join-community" element={<JoinACommunity />} />
						<Route
							path="/community-joined-successfully"
							element={<CommunityJoinedSuccessfully />}
						/>
						<Route element={<CommunityRequiredRoutes />}>
							<Route path="/new-request" element={<NewRequest />} />
							<Route path="/active-requests" element={<ActiveRequests />} />
							<Route path="/request-history" element={<RequestHistory />} />
							<Route
								path="/request-details/:id"
								element={<RequestDetailsComponent />}
							/>
							<Route
								path="/request-created-successfully"
								element={<RequestCreatedSuccessfully />}
							/>
						</Route>
						<Route element={<AdminRequiredRoutes />}>
							<Route path="/create-community" element={<CreateCommunity />} />
							<Route
								path="/community-created-successfully"
								element={<CommunityCreatedSuccessfully />}
							/>
						</Route>
					</Route>
				</Route>
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/register" element={<RegisterComponent />} />
			</Routes>
		</Router>
	);
}

export default App;
