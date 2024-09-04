import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ListRoundedIcon from "@mui/icons-material/ListRounded";

import { Menu, MenuItem } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Basket from "./Basket";
import {
	sweetErrorHandling,
	sweetTopSmallErrorAlert,
	sweetTopSmallSuccessAlert,
	sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobal";
import { BasketProps, T } from "../../../lib/types/common";
import { Messages } from "../../../lib/config";
import UserService from "../../services/UserService";

const Navbar = (props: BasketProps) => {
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
	const { authUser, darkMode, setDarkMode, setAuthUser } = useGlobals();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const location = useLocation();
	const isOrdersPage = location.pathname === "/shop/orders";

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const handleLogoutRequest = async () => {
		try {
			const userService = new UserService();
			setAnchorEl(null);
			setOpen(false);

			await userService.userLogout();
			await sweetTopSuccessAlert("success", 700);
			setAuthUser(null);
		} catch (error) {
			sweetErrorHandling(Messages.SOMETHING_WENT_WRONG);
		}
	};

	const handleClickSideBar = () => {
		alert("Side bar coming soon!");
	};

	const copyTextOnClick = (textToCopy: string) => {
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				sweetTopSmallSuccessAlert("Url is copied successfully", 1000).then();
			})
			.catch((error) => {
				console.log("Error on copying url! =>", error);
				sweetTopSmallErrorAlert("Error on copying url!").then();
			});
	};

	const handleCopyurl = () => {
		const currentUrl = window.location.href;
		copyTextOnClick(currentUrl);
	};

	const handleClickSearch = () => {
		alert("Click search is coming soon!");
	};

	const handleClickOnChange = (e: T) => {
		// console.log(e)
	};

	const handleOnKeyDown = (e: T) => {
		if (e.keyCode === 13 || e.key === "Enter") {
			alert("On key down is coming soon!");
		}
	};

	const handleClickThemeMode = () => {
		setDarkMode(!darkMode);
		setAnchorEl(null);
		setOpen(false);
	};

	return (
		<div className="main-container flex flex-col">
			<div className="flex justify-between">
				<div className="flex justify-center items-center">
					<NavLink
						className={"border rounded-md bg-[#b0c4b1] p-1 text-sm"}
						to={"#"}
						title="sell your items"
					>
						#sell
					</NavLink>
				</div>
				<div className="space-x-2 flex flex-row justify-center items-center">
					<div className={authUser ? "hidden" : "flex space-x-1"}>
						<NavLink
							className="border rounded-md bg-[#8d99ae] p-1 text-sm"
							to={"/shop/process/login"}
							title="login"
						>
							login
						</NavLink>
						<NavLink
							className="border rounded-md bg-[#8d99ae] p-1 text-sm"
							to={"/shop/process/signup"}
							title="signup"
						>
							signup
						</NavLink>
					</div>
					<div
						className={
							authUser ? "border rounded-md bg-[#8d99ae] p-1 text-sm" : "hidden"
						}
					>
						Welcome!
					</div>
					<NavLink
						className={`border rounded-md bg-[#8d99ae] p-1 text-sm`}
						to={"http://ibrohimbek.link/"}
						title="call center"
					>
						call center
					</NavLink>
				</div>
			</div>

			<div className="flex justify-between items-center">
				<div className="flex w-1/5 space-x-2 justify-start items-center">
					<div onClick={handleClickSideBar} className="cursor-pointer">
						<ListRoundedIcon sx={{ fontSize: 60 }} />
					</div>
					<NavLink
						to={"/shop/"}
						onClick={handleCopyurl}
						className="text-[#bc6c25] cursor-pointer text-3xl font-bold"
					>
						My Shop
					</NavLink>
				</div>

				<div className="flex w-1/2 items-center justify-between p-4 bg-white">
					{isOrdersPage ? (
						<div className="flex items-center justify-center p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
							<span className="font-semibold text-yellow-800">
								Select any shortcut links or continue your progress!
							</span>
						</div>
					) : (
						<div className="rounded-lg space-x-1 w-full flex items-center">
							<input
								className="w-full text-base shadow-md px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
								placeholder="Search..."
								onChange={(e) => handleClickOnChange(e)}
								onKeyDown={handleOnKeyDown}
							/>
							<div
								onClick={handleClickSearch}
								className="p-2 cursor-pointer shadow-md border border-gray-300 rounded-lg"
							>
								<SearchIcon sx={{ fontSize: 34 }} />
							</div>
						</div>
					)}
				</div>

				<div className=" w-3/10 flex justify-end items-center">
					<div className="flex space-x-3 justify-center items-center">
						<div className="">
							<div
								onClick={handleClick}
								className="flex cursor-pointer justify-center items-center flex-col"
							>
								<AssignmentIndIcon sx={{ fontSize: 35 }} />
								<span className="normal-case text-base">My Page</span>
							</div>
							<Menu
								id="dropdown-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{
									"aria-labelledby": "simple-menu",
								}}
							>
								<MenuItem onClick={handleClose}>
									<NavLink
										className={"hover:text-black hover:font-semibold w-full"}
										to={"/my/profile"}
									>
										Profile
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<NavLink
										className={"hover:text-black hover:font-semibold w-full"}
										to={"/my/order-history"}
									>
										Order History
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<NavLink
										className={"hover:text-black hover:font-semibold w-full"}
										to={"/shop/orders"}
									>
										Order Page
									</NavLink>
								</MenuItem>
								<div>
									{authUser ? (
										<MenuItem onClick={handleLogoutRequest}>
											<span
												className={
													"hover:text-black hover:font-semibold w-full"
												}
											>
												Log out
											</span>
										</MenuItem>
									) : (
										<MenuItem onClick={handleClose}>
											<NavLink to={"/shop/process/login"}>
												Login | Signup
											</NavLink>
										</MenuItem>
									)}
								</div>
								<MenuItem onClick={handleClickThemeMode}>
									<span
										className={"hover:text-black hover:font-semibold w-full"}
									>
										{darkMode ? "Light mode" : "Night mode"}
									</span>
								</MenuItem>
							</Menu>
						</div>

						<>
							<Basket
								cartItems={cartItems}
								onAdd={onAdd}
								onDelete={onDelete}
								onRemove={onRemove}
								onDeleteAll={onDeleteAll}
							/>
						</>
					</div>
				</div>
			</div>

			<div className="flex justify-center items-center mb-2">
				<div className="space-x-4">
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/electronics"}
					>
						#electronics
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/text_tiles"}
					>
						#text-tiles
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/home_living"}
					>
						#home_living
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/beauty_skin"}
					>
						#beauty_skin
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/sports"}
					>
						#sports
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/toys"}
					>
						#toys
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/books"}
					>
						#books
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/grocery"}
					>
						#grocery
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/automotive"}
					>
						#automotive
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/health"}
					>
						#health
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/shop/others"}
					>
						#others
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
