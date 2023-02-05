import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginRegisterComponent from "./loginRegister";
import ProtectedRoutes from "./ProtectedRoutes";

let token = false;

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<ProtectedRoutes token={token} />}></Route>
				<Route path="/login" element={<LoginRegisterComponent />} />
			</Routes>
		</Router>
	);
}

export default App;
