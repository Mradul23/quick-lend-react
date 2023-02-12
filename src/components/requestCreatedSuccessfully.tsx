import { Link } from "react-router-dom";
import PageTransitionVariants from "../framerMotionVariants/pageTransitionVariants";
import { motion } from "framer-motion";

export default function RequestCreatedSuccessfully() {
	return (
		<motion.div
			className="flex flex-col items-center"
			variants={PageTransitionVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			<h1 className="font-bold text-5xl mt-20 mb-6 text-fuchsia-900">
				Request created successfully
			</h1>
			<p className="font-light text-3xl mb-10 text-fuchsia-200 text-center">
				You may find it among the list of active requests by setting the
				required filters.
			</p>
			<Link to="/dashboard">
				<button className="hover:bg-white hover:text-fuchsia-700 text-white font-bold p-4 transition-colors mt-8 border-2">
					Back to dashboard
				</button>
			</Link>
		</motion.div>
	);
}
