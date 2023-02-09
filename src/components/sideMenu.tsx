import "../componentSpecificStyles/sideMenuStyles.css";
import useLogout from "../customHooksAndServices/logoutHook";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../customHooksAndServices/authContextHook";

export default function SideMenu(props: { showMenu: boolean }) {
	const { showMenu } = props;
	const { logout } = useLogout();
	const navigate = useNavigate();
	const { setUser } = useAuth();
	const { pathname } = useLocation();

	const handleLogout = () => {
		logout().then(() => {
			setUser({
				username: "",
				accessToken: "",
				firstName: "",
				lastName: "",
				phoneNumber: "",
				email: "",
				community: "",
			});
			navigate("/");
		});
	};
	return (
		<div
			className={`flex flex-col items-center side-menu pt-32 ${
				showMenu ? "side-menu-active" : ""
			}`}
		>
			<button>Edit your profile</button>
			<button>View request history</button>
			<button>Join a community</button>
			{pathname !== "/dashboard" ? (
				<button className="mt-auto">
					<Link to="/dashboard">Back to dashboard</Link>
				</button>
			) : null}
			<button
				className={pathname === "/dashboard" ? "mt-auto" : ""}
				onClick={handleLogout}
			>
				Log out
			</button>
		</div>
	);
}
