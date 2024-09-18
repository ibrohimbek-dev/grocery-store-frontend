import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobal";
import { UserType } from "../../../lib/enums/user.enum";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const UserProfile = () => {
	const navigate = useNavigate();
	const { authUser } = useGlobals();

	if (!authUser) navigate("/");

	// Right Section
	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="w-[20%] p-6 bg-white shadow-md rounded-lg"
		>
			<div className="flex flex-col items-center">
				<div className="relative mb-4">
					<div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500">
						<img
							alt="User Avatar"
							src={
								authUser?.userImage
									? `${serverApi}/${authUser?.userImage}`
									: "/icons/default-user.svg"
							}
							className="w-full h-full object-cover"
						/>
					</div>
					<div className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full shadow-md flex items-center justify-center">
						{authUser?.userType === UserType.STORE_OWNER ? (
							<span className="text-white text-sm">👑</span>
						) : (
							<span className="text-white text-sm">👤</span>
						)}
					</div>
				</div>

				<span className="text-xl font-semibold text-gray-800">
					{authUser?.userNick}
				</span>
				<span className="text-sm text-gray-600">{authUser?.userType}</span>
				<span className="text-sm text-gray-600">
					{authUser?.userAddress || "No address"}
				</span>
			</div>

			<div className="flex justify-center space-x-6 mt-6">
				<NavLink
					to="https://www.linkedin.com/in/ibrohimbek-dev"
					target="_blank"
				>
					<FaLinkedin className="text-2xl cursor-pointer text-blue-700 hover:text-blue-900" />
				</NavLink>
				<NavLink to="https://www.instagram.com/ibek0127" target="_blank">
					<FaInstagram className="text-2xl cursor-pointer text-pink-600 hover:text-pink-800" />
				</NavLink>
				<NavLink to="https://t.me/devcode0101" target="_blank">
					<FaTelegram className="text-2xl cursor-pointer text-blue-400 hover:text-blue-600" />
				</NavLink>
				<NavLink to="https://www.youtube.com/@devcode0101" target="_blank">
					<FaYoutube className="text-2xl cursor-pointer text-red-600 hover:text-red-800" />
				</NavLink>
			</div>

			<p className="mt-6 text-center text-gray-700">
				{authUser?.userDesc || "No description available"}
			</p>
		</motion.div>
	);
};

export default UserProfile;
