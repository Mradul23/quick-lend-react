import "../componentSpecificStyles/sideMenuStyles.css";
import useLogout from "../customHooksAndServices/logoutHook";
import { useNavigate } from "react-router-dom";
import useAuth from "../customHooksAndServices/authContextHook";

export default function SideMenu(props: { showMenu: boolean }) {
	const { showMenu } = props;
	const { logout } = useLogout();
	const navigate = useNavigate();
	const { setUser } = useAuth();

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
			<button>View your past requests</button>
			<button>Join a community</button>
			<button className="mt-auto" onClick={handleLogout}>
				Log out
			</button>
		</div>
	);
}
