import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";
import { motion } from "framer-motion";
import UserSettings from "./UserSettings";
import UserProfile from "./UserProfile";

const UserPage = () => {
	const navigate = useNavigate();
	const { authUser } = useGlobals();

	if (!authUser) navigate("/");

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="flex w-full bg-gray-50 min-h-screen"
		>
			{/* Left Section */}
			<UserSettings />

			{/* Right Section */}
			<UserProfile />
		</motion.div>
	);
};

export default UserPage;
