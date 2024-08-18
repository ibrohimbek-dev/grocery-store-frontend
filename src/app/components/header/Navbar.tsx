import React from "react";
import { NavLink } from "react-router-dom";
import { useGlobals } from "app/hooks/useGlobal";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import { BasketProps } from "lib/types/common";

const Navbar = (props: BasketProps) => {
	const { authUser } = useGlobals();

	return (
		<div className="main-container flex flex-col">
			<div className="flex justify-between">
				<div className="flex justify-center items-center">
					<NavLink
						className={"border rounded-md bg-[#e9edc9] px-2 text-sm"}
						to={"#"}
					>
						sell
					</NavLink>
				</div>
				<div className="space-x-2 flex flex-row justify-center items-center">
					<NavLink
						className={`${
							authUser ? "hidden" : "flex"
						} border rounded-md bg-[#8d99ae] px-2 text-sm`}
						to={"#"}
					>
						login
					</NavLink>
					<NavLink
						className={`${
							authUser ? "hidden" : "flex"
						} border rounded-md bg-[#8d99ae] px-2 text-sm`}
						to={"#"}
					>
						signup
					</NavLink>
					<NavLink
						className={`${
							authUser ? "hidden" : "flex"
						} border rounded-md bg-[#8d99ae] px-2 text-sm`}
						to={"#"}
					>
						call center
					</NavLink>
				</div>
			</div>

			<div>
				<div>Menu</div>

				<div>
					<div className="border">
						<div>My Shop</div>
						<div className="">
							<input />
							<SearchIcon />
						</div>
						<div>
							{/* My Page */}
							<div>
								<Dropdown>
									<MenuButton>
										<PersonOutlineIcon />
										<span>My Page</span>
									</MenuButton>
									<Menu>
										<MenuItem>Profile</MenuItem>
										<MenuItem>My account</MenuItem>
										<MenuItem>Logout</MenuItem>
									</Menu>
								</Dropdown>
							</div>

							{/* My Cart */}
							{/* TODO: Shu qismiga keldim */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
