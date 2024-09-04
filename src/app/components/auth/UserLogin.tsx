import React, { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";
import { Messages } from "../../../lib/config";
import { LoginInput } from "../../../lib/types/user";
import { T } from "../../../lib/types/common";
import UserService from "../../services/UserService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

const UserLogin = () => {
	const loginBgImage = "/img/assets/login-bg.webp";
	const location = useLocation();
	const navigate = useNavigate();
	const { setAuthUser } = useGlobals();

	const [imgLoad, setImgLoad] = useState<boolean>(false);
	// Initialization section:
	const [userNick, setUserNick] = useState<string>("");
	const [userPassword, setUserPassword] = useState<string>("");

	const getNavLinkClass = (path: string) => {
		const activeClass = "contained";
		const inActiveClass = "outlined";

		return location.pathname === path ? activeClass : inActiveClass;
	};

	useEffect(() => {
		const preImg = new Image();
		preImg.src = loginBgImage;
		preImg.onload = () => {
			setImgLoad(true);
		};
	}, [loginBgImage]);

	// Handlers:
	const handleUserName = (e: T) => {
		setUserNick(e.target.value);
	};

	const handleUserPassword = (e: T) => {
		setUserPassword(e.target.value);
	};

	const from = location.state?.from || "/";

	const handleLoginRequest = async () => {
		try {
			const userService = new UserService();
			const isFullFill = userNick !== "" && userPassword !== "";
			if (!isFullFill) throw new Error(Messages.INCOMPLETE_INPUT);

			const loginInput: LoginInput = {
				userNick: userNick,
				userPassword: userPassword,
			};

			const result = await userService.userLogin(loginInput);
			console.log("result =>", result);
			setAuthUser(result);
			navigate(from);
		} catch (err) {
			console.log("err =>", err);
			sweetErrorHandling(err).then();
		}
	};

	const handlePasswordKeyDown = (e: T) => {
		if (e.key === "Enter") {
			handleLoginRequest().then();
		} else if (e.key === "Enter") {
			handleLoginRequest().then();
		}
	};

	return (
		<div className="w-full h-[600px] flex justify-center">
			{imgLoad ? (
				<img
					alt="background"
					className="fixed w-full h-full object-cover -z-10 opacity-40"
					src={loginBgImage}
				/>
			) : (
				<div className="fixed w-full h-full bg-gray-400 -z-10" />
			)}
			<div className="flex  rounded-lg  flex-col sm:w-[600px] space-y-2 p-2  justify-center items-center">
				<div className="w-full justify-between flex">
					<div className="flex space-x-2">
						<NavLink to={"/shop/process/signup"}>
							<Button
								variant={getNavLinkClass("/shop/process/signup")}
								color="success"
							>
								Sign Up
							</Button>
						</NavLink>
						<p className="font-mono">or</p>
						<NavLink to={"/shop/process/login"}>
							<Button
								variant={getNavLinkClass("/shop/process/login")}
								color="success"
							>
								Log In
							</Button>
						</NavLink>
					</div>
					<NavLink to={from}>
						<Button variant="outlined">
							<FaBackward />
						</Button>
					</NavLink>
				</div>
				<div className="relatve backdrop-blur-sm rounded-lg w-full px-1 sm:px-2 py-2 sm:py-6 border">
					<div className="w-full space-y-2 max-w-lg mx-auto">
						<div className="space-y-1">
							<label
								htmlFor="userNick"
								className="block text-sm sm:text-base font-bold"
							>
								User name*
							</label>
							<input
								type="text"
								name="userNick"
								id="userNick"
								className="border-2 user-nick rounded-lg px-2 sm:px-4 py-1 sm:py-2 w-full outline-offset-1"
								placeholder="User name"
								required
								autoComplete="user-nick"
								onChange={handleUserName}
								onKeyDown={handlePasswordKeyDown}
							/>
						</div>

						<div className="w-full space-y-1">
							<label
								htmlFor="userNick"
								className="block text-sm sm:text-base font-bold"
							>
								Password*
							</label>
							<input
								type="password"
								name="userPassword"
								id="userPassword"
								className="border-2 user-password rounded-lg px-2 sm:px-4 py-1 sm:py-2 w-full"
								placeholder="Enter password"
								required
								autoComplete="new-password"
								onChange={handleUserPassword}
								onKeyDown={handlePasswordKeyDown}
							/>
						</div>

						<Button
							sx={{ width: "100%" }}
							onClick={handleLoginRequest}
							variant="contained"
						>
							Login
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;

// DONE!
