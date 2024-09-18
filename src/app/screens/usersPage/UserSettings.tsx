import React, { useState } from "react";
import { useGlobals } from "../../hooks/useGlobal";
import { Messages, serverApi } from "../../../lib/config";
import { UserUpdateInput } from "../../../lib/types/user";
import { T } from "../../../lib/types/common";
import UserService from "../../services/UserService";
import {
	sweetErrorSmallHandling,
	sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { Button } from "@mui/material";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const UserSettings = () => {
	const { authUser, setAuthUser } = useGlobals();
	const [userImage, setUserImage] = useState<string>(
		authUser?.userImage
			? `${serverApi}/${authUser.userImage}`
			: "/icons/default-user.svg"
	);

	const [userUpdateInput, setUserUpdateInput] = useState<UserUpdateInput>({
		userNick: authUser?.userNick,
		userPhone: authUser?.userPhone,
		userAddress: authUser?.userAddress,
		userDesc: authUser?.userDesc,
		userImage: authUser?.userImage,
	});

	// HANDLERS
	const handleInputChange = (e: T) => {
		const { name, value } = e.target;
		setUserUpdateInput((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmitButton = async () => {
		try {
			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}

			if (Object.values(userUpdateInput).some((value) => value === "")) {
				throw new Error(Messages.INCOMPLETE_INPUT);
			}

			const userService = new UserService();
			const result = await userService.updateUser(userUpdateInput);
			setAuthUser(result);
			console.log("result on user settings =>", result);
			await sweetTopSmallSuccessAlert(Messages.MODIFIED_SUCCESSFULLY, 700);
		} catch (error) {
			console.log("Error on handleSubmitButton =>", error);
			sweetErrorSmallHandling(error).then();
		}
	};

	// IMAGE PREVIEW HANDLER
	const handleImageViewer = (e: T) => {
		const file = e.target.files[0];
		const fileType = file.type;

		const validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];

		if (!validateImageTypes.includes(fileType)) {
			sweetErrorSmallHandling(Messages.INVALID_IMAGE_FORMAT).then();
		} else {
			if (file) {
				setUserUpdateInput((prev) => ({ ...prev, userImage: file }));
				setUserImage(URL.createObjectURL(file));
			}
		}
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="settings w-[80%] p-6 bg-white rounded-lg shadow-md"
		>
			<div className="w-full p-6 bg-white shadow-md rounded-lg">
				<h2 className="text-2xl font-semibold text-gray-800">
					Modify Your Account
				</h2>
				<div className="mt-6">
					<div className="flex justify-between items-center mb-6">
						<img
							src={userImage}
							className="rounded-full w-40 h-40 object-cover border-2 cursor-pointer border-green-500"
							alt="User"
						/>
						<div className="media-change-box mt-4 text-center">
							<span className="block text-lg font-semibold">Upload Image</span>
							<p className="text-sm text-gray-500">
								Only these formats are allowed: JPG, JPEG, PNG
							</p>
							<div className="up-del-box mt-2">
								<Button
									onChange={handleImageViewer}
									component="label"
									variant="outlined"
									className="flex items-center border-gray-400"
								>
									<FaCloudDownloadAlt className="mr-2" />
									Upload
									<input type="file" hidden />
								</Button>
							</div>
						</div>
					</div>

					<div className="input-frame mb-4">
						<label className="block text-sm font-medium mb-1">User Name</label>
						<input
							className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
							type="text"
							placeholder="Your name..."
							name="userNick"
							value={userUpdateInput.userNick}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-frame mb-4 flex space-x-4">
						<div className="short-input w-1/2">
							<label className="block text-sm font-medium mb-1">Phone</label>
							<input
								className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
								type="text"
								placeholder="Your phone number..."
								name="userPhone"
								value={userUpdateInput.userPhone}
								onChange={handleInputChange}
							/>
						</div>

						<div className="short-input w-1/2">
							<label className="block text-sm font-medium mb-1">Address</label>
							<input
								className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
								type="text"
								placeholder="Your address..."
								name="userAddress"
								value={userUpdateInput.userAddress}
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="input-frame mb-4">
						<label className="block text-sm font-medium mb-1">
							Description
						</label>
						<textarea
							className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
							placeholder="About yourself..."
							name="userDesc"
							value={userUpdateInput.userDesc}
							onChange={handleInputChange}
						/>
					</div>

					<div className="save-box">
						<Button
							onClick={handleSubmitButton}
							variant="contained"
							className="w-full bg-blue-500 text-white hover:bg-blue-600"
						>
							Save
						</Button>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default UserSettings;
