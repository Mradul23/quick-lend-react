import { Outlet, Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";

export default function ProtectedRoutes({
	token,
}: PropsWithChildren<{ token: boolean }>) {
	console.log(token);
	return token ? <Outlet /> : <Navigate to="/login" />;
}
