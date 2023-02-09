import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../customHooksAndServices/authContextHook";
import jwtDecode from "jwt-decode";
import useRefreshToken from "../customHooksAndServices/refreshTokenHook";
import { useEffect, useState } from "react";

interface TokenContents {
	exp: number;
	iat: number;
	username: string;
}

export default function ProtectedRoutes() {
	const { user } = useAuth();
	const [loading, setLoading] = useState(true);
	const token = user.accessToken;
	const { refreshToken } = useRefreshToken();
	const navigateTo = useNavigate();
	const decodedToken = token ? jwtDecode<TokenContents>(token) : null;
	const location = useLocation();
	const currentTime = Date.now() / 1000;

	useEffect(() => {
		if (decodedToken && decodedToken.exp > currentTime) {
			setLoading(false);
		} else {
			refreshToken()
				.then((data) => {
					setLoading(false);
				})
				.catch((err) => {
					setLoading(false);
					console.log(err);
					navigateTo("/", { state: { from: location }, replace: true });
				});
		}
	}, [decodedToken, currentTime, refreshToken, navigateTo, location]);

	return loading ? (
		<div className="flex flex-col items-center font-bold text-5xl mt-20 mb-6 text-white">
			<p>Loading...</p>
		</div>
	) : (
		<Outlet />
	);
}
