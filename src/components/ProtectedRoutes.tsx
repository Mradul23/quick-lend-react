import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../contexts/authProvider";
import jwtDecode from "jwt-decode";

interface TokenContents {
	exp: number;
	iat: number;
	username: string;
}

export default function ProtectedRoutes() {
	const { user } = useAuth();
	const token = user.accessToken;
	const decodedToken = token ? jwtDecode<TokenContents>(token) : null;
	const location = useLocation();
	const currentTime = Date.now() / 1000;

	if (!decodedToken || decodedToken.exp < currentTime) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
	return <Outlet />;
}
