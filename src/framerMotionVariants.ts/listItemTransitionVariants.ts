const ListItemTransitionVariants = {
	initial: {
		opacity: 0,
		x: 100,
	},
	animate: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 100,
		},
	},
	exit: {
		opacity: 0,
	},
};

export default ListItemTransitionVariants;
