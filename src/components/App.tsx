import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./login";
import RegisterComponent from "./register";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardComponent from "./dashboard";
import LandingPageComponent from "./landingPage";
import JoinACommunity from "./joinACommunity";
import SideMenuWrapper from "./sideMenuWrapper";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPageComponent />} />
				<Route element={<ProtectedRoutes />}>
					<Route element={<SideMenuWrapper />}>
						<Route path="/dashboard" element={<DashboardComponent />} />
						<Route path="/join-community" element={<JoinACommunity />} />
					</Route>
				</Route>
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/register" element={<RegisterComponent />} />
			</Routes>
		</Router>
	);
}

export default App;
