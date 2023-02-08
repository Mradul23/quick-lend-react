import "../componentSpecificStyles/hamburgerStyles.css";

export default function HamburgerButton(props: { menuActive: boolean }) {
	const { menuActive } = props;
	return (
		<div className={`hamburger-icon ${menuActive ? "menu-active" : ""}`}>
			<span className="bar-1"></span>
			<span className="bar-2"></span>
			<span className="bar-3"></span>
		</div>
	);
}
