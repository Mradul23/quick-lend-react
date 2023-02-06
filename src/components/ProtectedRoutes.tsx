import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../contexts/authProvider";

export default function ProtectedRoutes() {
	const { user } = useAuth();
	const token = user.accessToken;
	return token ? <Outlet /> : <Navigate to="/login" />;
}
