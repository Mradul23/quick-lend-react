import useAuth from "../customHooksAndServices/authContextHook";
import HamburgerButton from "./hamburgerIcon";
import SideMenu from "./sideMenu";
import { useState } from "react";

export default function DashboardComponent() {
	const { user } = useAuth();
	const [showMenu, setShowMenu] = useState(false);
	return (
		<div className="flex flex-col items-center">
			<HamburgerButton menuActive={showMenu} setShowMenu={setShowMenu} />
			<SideMenu showMenu={showMenu} />
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
				Hello {user.firstName}!
			</h1>
			<p className="font-light text-3xl mb-10 text-fuchsia-200">
				Welcome to your dashboard.
			</p>
		</div>
	);
}
