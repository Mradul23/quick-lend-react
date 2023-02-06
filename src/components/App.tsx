import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegisterComponent from "./loginRegister";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardComponent from "./dashboard";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<ProtectedRoutes />}>
					<Route path="/dashboard" element={<DashboardComponent />} />
				</Route>
				<Route path="/login" element={<LoginRegisterComponent />} />
			</Routes>
		</Router>
	);
}

export default App;
