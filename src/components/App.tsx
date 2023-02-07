import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginComponent from "./login";
import RegisterComponent from "./register";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardComponent from "./dashboard";
import LandingPageComponent from "./landingPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LandingPageComponent />} />
				<Route path="/" element={<ProtectedRoutes />}>
					<Route path="/dashboard" element={<DashboardComponent />} />
				</Route>
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/register" element={<RegisterComponent />} />
			</Routes>
		</Router>
	);
}

export default App;
