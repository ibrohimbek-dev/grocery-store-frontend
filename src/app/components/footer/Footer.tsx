import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
		>
			Footer
		</motion.div>
	);
};

export default Footer;
