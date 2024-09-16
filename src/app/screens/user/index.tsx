import React from "react";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaTelegram, FaYoutube } from "react-icons/fa";
import Settings from "./Settings";
import { serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobal";
import { UserType } from "../../../lib/enums/user.enum";
import { NavLink } from "react-router-dom";

const UserPage = () => {
	const navigate = useNavigate();
	const { authUser } = useGlobals();

	if (!authUser) navigate("/");

	return (
		<div className="user-page">
			<div className="container mx-auto p-4">
				<div className="flex my-4">
					{/* Left Section */}
					<div className="w-1/3 p-4">
						<h2 className="text-xl font-bold">Modify Member Details</h2>
						<div className="mt-4">
							<Settings />
						</div>
					</div>

					{/* Right Section */}
					<div className="w-2/3 p-4">
						<div className="bg-white shadow-lg rounded-lg p-6">
							<div className="flex flex-col items-center">
								<div className="relative">
									<div className="w-24 h-24 rounded-full overflow-hidden">
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
									<div className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
										{authUser?.userType === UserType.SHOP_OWNER ? (
											<span className="text-sm">🍽️</span> // Example icon
										) : (
											<span className="text-sm">👤</span> // Example icon
										)}
									</div>
								</div>

								<span className="mt-2 text-lg font-semibold">
									{authUser?.userNick}
								</span>
								<span className="text-sm text-gray-600">
									{authUser?.userType}
								</span>
								<span className="text-sm text-gray-600">
									{authUser?.userAddress || "No address"}
								</span>
							</div>

							<div className="flex justify-center space-x-4 mt-4">
								<NavLink
									rel="noopener noreferrer"
									target="_blank"
									to={"https://www.linkedin.com/in/ibrohimbek-dev"}
								>
									<FaLinkedin className="text-xl cursor-pointer text-blue-600 hover:text-blue-800" />
								</NavLink>
								<NavLink
									rel="noopener noreferrer"
									target="_blank"
									to={"https://www.instagram.com/ibek0127"}
								>
									<FaInstagram className="text-xl cursor-pointer text-pink-600 hover:text-pink-800" />
								</NavLink>
								<NavLink
									rel="noopener noreferrer"
									target="_blank"
									to={"https://t.me/devcode0101"}
								>
									<FaTelegram className="text-xl cursor-pointer text-blue-400 hover:text-blue-600" />
								</NavLink>
								<NavLink
									rel="noopener noreferrer"
									target="_blank"
									to={"https://www.youtube.com/@devcode0101"}
								>
									<FaYoutube className="text-xl cursor-pointer text-red-600 hover:text-red-800" />
								</NavLink>
							</div>

							<p className="mt-4 text-center">
								{authUser?.userDesc || "No description"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserPage;
