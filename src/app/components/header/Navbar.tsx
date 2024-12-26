import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { Menu, MenuItem } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Basket from "./Basket";
import {
	sweetErrorHandling,
	sweetTopSmallErrorAlert,
	sweetTopSmallInfoAlert,
	sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobal";
import { BasketProps } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import UserService from "../../services/UserService";
import OrderService from "../../services/OrderService";
import { motion } from "framer-motion";
import { MdOutlineMenuOpen } from "react-icons/md";
import SearchBar from "./SearchBar";
import Fade from "@mui/material/Fade";
import { GiStarFormation } from "react-icons/gi";
import { UserType } from "../../../lib/enums/user.enum";

// REDUX SELECTOR

const Navbar = (props: BasketProps) => {
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
	const {
		authUser,
		darkMode,
		setDarkMode,
		setAuthUser,
		setOrderBuilder,
		setOpenSidebar,
		openSidebar,
	} = useGlobals();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = useState<boolean>(false);
	const navigate = useNavigate();

	const location = useLocation();
	const isHome = location.pathname === "/";

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
			await sweetTopSmallSuccessAlert("success", 700);
			onDeleteAll();
			setOrderBuilder(new Date());
			setAuthUser(null);
		} catch (error) {
			sweetErrorHandling(Messages.SOMETHING_WENT_WRONG);
		}
	};

	const handleClickSideBar = () => {
		setOpenSidebar(!openSidebar);
	};

	const handleClickThemeMode = () => {
		// NIGHT-MODE: Night mode is always false
		sweetTopSmallInfoAlert(
			"Night and Dark mode disabled by developers!",
			5000
		).then();
		setDarkMode(false);
		setAnchorEl(null);
		setOpen(false);
	};

	const proceedOrderHandler = async () => {
		try {
			handleClose();

			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}

			if (cartItems.length) {
				const orderService = new OrderService();
				await orderService.createOrder(cartItems);

				onDeleteAll();
				setOrderBuilder(new Date());
				navigate("/store/orders");
			} else {
				throw new Error(Messages.CART_EMPTY);
			}
		} catch (err: any) {
			sweetTopSmallErrorAlert(err.message).then();
		}
	};

	const sellHandleClick = () => {
		sweetTopSmallInfoAlert(Messages.COMING_SOON).then();
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="3xl:flex hidden flex-col main-container"
		>
			<div className="flex justify-between">
				<div className="flex justify-center items-center">
					<NavLink
						className={"border rounded-md bg-[#b0c4b1] p-1 text-sm"}
						to={"#"}
						title="sell your items"
						onClick={sellHandleClick}
					>
						#sell
					</NavLink>
				</div>
				<div className="space-x-2 flex flex-row justify-center items-center">
					<div className={authUser ? "hidden" : "flex space-x-1"}>
						<NavLink
							className="border rounded-md bg-[#8d99ae] p-1 text-sm"
							to={"/store/process/login"}
							title="login"
						>
							login
						</NavLink>
						<NavLink
							className="border rounded-md bg-[#8d99ae] p-1 text-sm"
							to={"/store/process/signup"}
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
						Welcome{" "}
						{authUser && authUser?.userNick?.length > 7
							? authUser?.userNick?.slice(0, 7) + "..."
							: authUser?.userNick}
						!
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
				<div className="flex w-1/3 space-x-2 justify-start items-center">
					<div className="flex flex-row items-center justify-center">
						<div onClick={handleClickSideBar} className="cursor-pointer">
							<MdOutlineMenuOpen
								title="open side bar"
								className="rounded-xl text-5xl text-blue-900"
							/>
						</div>
						<NavLink
							to={"/"}
							className="text-green-500 py-1 px-2 rounded-lg cursor-pointer text-3xl font-bold"
						>
							My Fresh Market
						</NavLink>
					</div>
				</div>

				{isHome && <SearchBar />}

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
									"aria-labelledby": "fade-button",
								}}
								sx={{
									display: "flex",
									flexDirection: "column",
									padding: 0,
								}}
								TransitionComponent={Fade}
							>
								<MenuItem onClick={handleClose}>
									<NavLink
										className={"hover:text-black hover:font-semibold w-full"}
										to={"/store/user-settings"}
									>
										Profile
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<NavLink
										className={"hover:text-black hover:font-semibold w-full"}
										to={"/store/orders/history"}
									>
										Order History
									</NavLink>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<NavLink
										onClick={proceedOrderHandler}
										className={"hover:text-black hover:font-semibold w-full"}
										to={"/store/orders"}
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
											<NavLink to={"/store/process/login"}>
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
								<MenuItem onClick={handleClose}>
									<NavLink
										className={"hover:text-black hover:font-semibold w-full"}
										to={"/store/help-page"}
									>
										Help Page
									</NavLink>
								</MenuItem>
								{authUser?.userType === UserType.STORE_OWNER && (
									<MenuItem onClick={handleClose}>
										<a
											className="hover:text-black flex justify-center items-center space-x-2 hover:font-semibold w-full"
											href={`${serverApi}/admin`}
											target="_blank" // Opens in a new tab
											rel="noopener noreferrer" // Security best practice
										>
											<p>Dashboard</p>
											<GiStarFormation className="text-yellow-500 text-xl" />
										</a>
									</MenuItem>
								)}
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
						to={"/store/products/recommends"}
					>
						#recommends
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/discounts"}
					>
						#discounts
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/ads"}
					>
						#ads
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/fresh-produce"}
					>
						#fresh-produce
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/dairy-products"}
					>
						#dairy-products
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/meat-poultry"}
					>
						#meat-poultry
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/bakery-items"}
					>
						#bakery-items
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/canned-foods"}
					>
						#canned-foods
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/products/beverages"}
					>
						#beverages
					</NavLink>
					<NavLink
						className={"italic  font-sans hover:text-blue-700"}
						to={"/store/users/active-users"}
					>
						#active-users
					</NavLink>
				</div>
			</div>
		</motion.div>
	);
};

export default Navbar;
