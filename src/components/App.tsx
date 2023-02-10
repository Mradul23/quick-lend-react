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
						<Route element={<CommunityRequiredRoutes />}>
							<Route path="/new-request" element={<NewRequest />} />
							<Route path="/active-requests" element={<ActiveRequests />} />
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
