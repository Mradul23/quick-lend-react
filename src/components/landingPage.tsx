import { Link } from "react-router-dom";
import LandingPageTransitionVariants from "../framerMotionVariants/landingPageTransitionVariants";
import { motion } from "framer-motion";
import "../index.css";
import ListItemTransitionVariants from "../framerMotionVariants/listItemTransitionVariants";

export default function LandingPageComponent() {
	return (
		<>
			<motion.div
				className="flex flex-col items-start pl-4"
				variants={LandingPageTransitionVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<motion.h1
					className="font-bold text-5xl mt-20 mb-6 text-fuchsia-600"
					variants={ListItemTransitionVariants}
				>
					Quick Lend
				</motion.h1>
				<motion.p
					className="font-light text-3xl mb-10 text-fuchsia-200"
					variants={ListItemTransitionVariants}
				>
					Quickly borrow/lend general utilities within a localized community!
				</motion.p>
				<motion.div
					className="flex flex-row justify-start items-center w-full"
					variants={ListItemTransitionVariants}
				>
					<Link to="/login">
						<button className="text-fuchsia-200 font-bold text-2xl px-8 py-2 mr-4 login-button">
							Login
						</button>
					</Link>
					<Link to="/register">
						<button className="text-fuchsia-200 font-bold text-2xl px-8 py-2 register-button">
							Register
						</button>
					</Link>
				</motion.div>
			</motion.div>
		</>
	);
}
