const ListItemTransitionVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			type: "linear",
			duration: 0.4,
			ease: "easeOut",
		},
	},
	whileHover: { scale: 1.05 },
	whileTap: { scale: 0.95 },
};

export default ListItemTransitionVariants;
