import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../componentSpecificStyles/hamburgerStyles.css";
import SideMenu from "./sideMenu";

export default function SideMenuWrapper() {
	const [showMenu, setShowMenu] = useState(false);

	const [touchStart, setTouchStart] = useState<React.Touch | null>(null);
	const [touchEnd, setTouchEnd] = useState<React.Touch | null>(null);

	return (
		<>
			<div
				className="h-screen w-screen fixed"
				onTouchStart={(e) => {
					setTouchEnd(null);
					setTouchStart(e.targetTouches[0]);
					console.log("lol");
				}}
				onTouchMove={(e) => {
					setTouchEnd(e.targetTouches[0]);
				}}
				onTouchEnd={(e) => {
					if (!touchStart || !touchEnd) return;
					const horizontalDistance = touchStart.clientX - touchEnd.clientX;
					const isLeftSwipe = horizontalDistance > 50;
					const isRightSwipe = horizontalDistance < -50;

					const verticalDistance = touchStart.clientY - touchEnd.clientY;

					if (
						isLeftSwipe &&
						Math.abs(horizontalDistance) > Math.abs(verticalDistance)
					) {
						setShowMenu(false);
					}
					if (
						isRightSwipe &&
						Math.abs(horizontalDistance) > Math.abs(verticalDistance)
					) {
						setShowMenu(true);
					}
				}}
			>
				<button
					className={`hamburger-icon fa fa-check absolute ml-8 mt-8 md:ml-4 md:mt-5 self-start text-white text-4xl ${
						showMenu ? "menu-active" : ""
					}`}
					onClick={() => setShowMenu(!showMenu)}
				>
					<span className="bar-1"></span>
					<span className="bar-2"></span>
					<span className="bar-3"></span>
				</button>
				<SideMenu showMenu={showMenu} setShowMenu={setShowMenu} />
				<Outlet />
			</div>
		</>
	);
}
