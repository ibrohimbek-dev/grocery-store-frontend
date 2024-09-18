import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { Button } from "@mui/material";
import {
	sweetErrorHandling,
	sweetTopSmallErrorAlert,
} from "../../../lib/sweetAlert";
import { Messages } from "../../../lib/config";
import { NavLink } from "react-router-dom";
import UserService from "../../services/UserService";
import { useGlobals } from "../../hooks/useGlobal";
import { motion } from "framer-motion";

const UserSignup: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const singUpBgImage = "/img/assets/signup-bg.webp";
	const [imgLoad, setImgLoad] = useState<boolean>(false);
	const { setAuthUser } = useGlobals();

	useEffect(() => {
		const preloadImage = new Image();
		preloadImage.src = singUpBgImage;
		preloadImage.onload = () => {
			setImgLoad(true);
		};
	}, [singUpBgImage]);

	const [userNick, setUserNick] = useState<string>("");
	const [userPhone, setUserPhone] = useState<string>("");
	const [userPassword, setUserPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [showAlertMsg, setShowAlertMsg] = useState<string>("");
	const userImageRef = useRef<HTMLInputElement | null>(null);

	const validateSignUpForm = () => {
		if (!userNick || !userPhone || !userPassword || !confirmPassword) {
			setShowAlertMsg(Messages.INCOMPLETE_INPUT);
			return false;
		}

		if (userPassword !== confirmPassword) {
			setShowAlertMsg(Messages.PASSWORD_NOT_MATCH);
			return false;
		}

		const userImageFile = userImageRef.current?.files?.[0];
		if (!userImageFile) {
			setShowAlertMsg(Messages.UPLOAD_IMAGE);
			return false;
		}

		return true;
	};

	const previewImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
		const files = event.target.files;
		if (files && files.length > 0) {
			const file = files[0];
			const validImageType: string[] = ["image/jpg", "image/jpeg", "image/png"];

			if (!validImageType.includes(file.type)) {
				sweetTopSmallErrorAlert(Messages.IMAGE_TYPE_FAILED);
				return;
			}

			const imgFrame =
				document.querySelector<HTMLImageElement>(".upload-img-frame");
			if (imgFrame) {
				imgFrame.src = URL.createObjectURL(file);
				imgFrame.classList.remove("hidden");
				imgFrame.style.display = "block";
			}
		}
	};

	const getNavLinkClass = (path: string) => {
		return location.pathname === path ? "contained" : "outlined";
	};

	const handleSignupRequest = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			if (!validateSignUpForm()) {
				console.log("showAlertMsg =>", showAlertMsg);
				throw new Error(showAlertMsg);
			}

			const userService = new UserService();

			const userImageFile = userImageRef.current?.files?.[0];

			const formData = new FormData();
			formData.append("userNick", userNick);
			formData.append("userPhone", userPhone);
			formData.append("userPassword", userPassword);
			if (userImageFile) {
				formData.append("userImage", userImageFile);
			}

			const result = await userService.userSignup(formData);
			setAuthUser(result);
			navigate("/");
		} catch (err) {
			sweetErrorHandling(err).then();
		}
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="w-full h-screen overflow-hidden flex justify-center"
		>
			{imgLoad ? (
				<img
					alt="background"
					className="fixed w-full h-full object-cover -z-10 opacity-40"
					src={singUpBgImage}
				/>
			) : (
				<div className="fixed w-full h-full bg-gray-400 -z-10" />
			)}
			<form
				onSubmit={handleSignupRequest}
				className="flex rounded-lg flex-col sm:w-[900px] space-y-2 p-2 justify-center items-center"
			>
				<div className="w-full justify-between flex">
					<div className="flex space-x-2">
						<NavLink to={"/process/signup"}>
							<Button
								variant={getNavLinkClass("/store/process/signup")}
								color="success"
							>
								Sign Up
							</Button>
						</NavLink>
						<p className="font-mono">or</p>
						<NavLink to={"/store/process/login"}>
							<Button
								variant={getNavLinkClass("/store/process/login")}
								color="success"
							>
								Login
							</Button>
						</NavLink>
					</div>
					<NavLink to={"/"}>
						<Button variant="outlined">
							<FaBackward />
						</Button>
					</NavLink>
				</div>
				<div className="relative backdrop-blur-sm rounded-lg w-full px-1 sm:px-2 py-2 sm:py-6 border">
					<div className="flex justify-start items-start space-x-6">
						<div className="w-full space-y-3 max-w-lg mx-auto">
							{/* User Nickname */}
							<div className="space-y-1">
								<label
									htmlFor="userNick"
									className="block text-sm sm:text-base font-bold"
								>
									User name*
								</label>
								<input
									type="text"
									className="border-2 rounded-lg px-2 sm:px-4 py-1 sm:py-2 w-full outline-none"
									placeholder="User name"
									required
									onChange={(e) => setUserNick(e.target.value)}
								/>
							</div>

							{/* User Phone */}
							<div className="space-y-1">
								<label
									htmlFor="userPhone"
									className="block text-sm sm:text-base font-bold"
								>
									Phone*
								</label>
								<input
									type="text"
									name="userPhone"
									id="userPhone"
									className="border-2 rounded-lg px-2 sm:px-4 py-1 sm:py-2 w-full outline-none"
									placeholder="User phone"
									required
									autoComplete="user-phone"
									onChange={(e) => setUserPhone(e.target.value)}
								/>
							</div>

							{/* Password Fields */}
							<div className="flex space-x-1 justify-center">
								<div className="w-2/4 space-y-1">
									<label
										htmlFor="userPassword"
										className="block text-sm sm:text-base font-bold"
									>
										Password*
									</label>
									<input
										type="password"
										name="userPassword"
										id="userPassword"
										className="border-2 rounded-lg px-2 sm:px-4 py-1 sm:py-2 w-full"
										placeholder="Enter password"
										required
										autoComplete="new-password"
										onChange={(e) => setUserPassword(e.target.value)}
									/>
								</div>

								<div className="w-2/4 space-y-1">
									<label
										htmlFor="confirmPassword"
										className="block text-sm sm:text-base font-bold"
									>
										Confirm Password*
									</label>
									<input
										type="password"
										name="confirmPassword"
										id="confirmPassword"
										className="border-2 rounded-lg px-2 sm:px-4 py-1 sm:py-2 w-full"
										placeholder="Repeat password"
										required
										autoComplete="new-password"
										onChange={(e) => setConfirmPassword(e.target.value)}
									/>
								</div>
							</div>

							<Button type="submit" sx={{ width: "100%" }} variant="contained">
								Signup
							</Button>
						</div>
						{/* Image Upload */}
						<div className="space-y-1 file-box flex justify-center flex-col">
							<label
								htmlFor="userImage"
								className="block text-sm sm:text-base font-bold"
							>
								Upload Image*
							</label>
							<input
								type="file"
								name="userImage"
								className="border-2 rounded-lg px-2 sm:px-4 py-2 w-full object-contain outline-none"
								required
								id="userImage"
								ref={userImageRef}
								onChange={previewImage}
							/>
							<img
								className="upload-img-frame w-96 h-80 rounded-md hidden"
								src=""
								alt="upload"
							/>
						</div>
					</div>
				</div>
			</form>
		</motion.div>
	);
};

export default UserSignup;
