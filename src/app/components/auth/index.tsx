import React from "react";
import { Route, Routes } from "react-router-dom";
import UserSignup from "./UserSignup";
import UserLogin from "./UserLogin";
import { motion } from "framer-motion";

const AuthenticationModal = () => {
	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="flex  flex-col items-center"
		>
			<Routes>
				<Route path="/signup" element={<UserSignup />} />
				<Route path="/login" element={<UserLogin />} />
			</Routes>
		</motion.div>
	);
};

export default AuthenticationModal;
