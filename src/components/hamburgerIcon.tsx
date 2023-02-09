import { Dispatch, SetStateAction } from "react";
import "../componentSpecificStyles/hamburgerStyles.css";

export default function HamburgerButton(props: {
	menuActive: boolean;
	setShowMenu: Dispatch<SetStateAction<boolean>>;
}) {
	const { menuActive, setShowMenu } = props;
	return (
		<button
			className={`hamburger-icon fa fa-check absolute ml-8 mt-8 self-start text-white text-4xl ${
				menuActive ? "menu-active" : ""
			}`}
			onClick={() => setShowMenu(!menuActive)}
		>
			<span className="bar-1"></span>
			<span className="bar-2"></span>
			<span className="bar-3"></span>
		</button>
	);
}
