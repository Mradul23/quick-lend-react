import { Link } from "react-router-dom";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import { motion } from "framer-motion";
import "../index.css";

export default function LandingPageComponent() {
	return (
		<>
			<motion.div
				className="flex flex-col items-center"
				variants={PageTransitionVariants}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
					Quick Lend
				</h1>
				<p className="font-light text-3xl mb-10 text-fuchsia-200">
					Quickly borrow/lend general utilities within a localized community!
				</p>
			</motion.div>
			<motion.div
				className="flex flex-row justify-center items-center w-full"
				variants={PageTransitionVariants}
				initial="initial"
				animate="animate"
				exit="exit"
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
		</>
	);
}
