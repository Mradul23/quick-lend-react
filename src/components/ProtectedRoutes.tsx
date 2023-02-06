import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../contexts/authProvider";

export default function ProtectedRoutes() {
	const { user } = useAuth();
	const token = user.accessToken;
	const location = useLocation();
	return token ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}
