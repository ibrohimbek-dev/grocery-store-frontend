import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { NavLink } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaTags, FaUsers } from "react-icons/fa";
import { MdAdsClick, MdEmojiFoodBeverage } from "react-icons/md";
import { FaAppleAlt, FaDrumstickBite, FaBreadSlice } from "react-icons/fa";
import { GiCannedFish, GiMilkCarton } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useGlobals } from "../../hooks/useGlobal";
import { motion } from "framer-motion";

const navLinks = [
	{
		name: "Recommends",
		path: "/store/products/recommends",
		icon: <AiFillStar className="text-2xl" />,
	},
	{
		name: "Discounts",
		path: "/store/products/discounts",
		icon: <FaTags className="text-2xl" />,
	},
	{
		name: "Advertisements",
		path: "/store/products/ads",
		icon: <MdAdsClick className="text-2xl" />,
	},
	{
		name: "Fresh Produce",
		path: "/store/products/fresh-produce",
		icon: <FaAppleAlt className="text-2xl" />,
	},
	{
		name: "Dairy Products",
		path: "/store/products/dairy-products",
		icon: <GiMilkCarton className="text-2xl" />,
	},
	{
		name: "Meat and Poultry",
		path: "/store/products/meat-poultry",
		icon: <FaDrumstickBite className="text-2xl" />,
	},
	{
		name: "Bakery Items",
		path: "/store/products/bakery-items",
		icon: <FaBreadSlice className="text-2xl" />,
	},
	{
		name: "Canned Foods",
		path: "/store/products/canned-foods",
		icon: <GiCannedFish className="text-2xl" />,
	},
	{
		name: "Beverages",
		path: "/store/products/beverages",
		icon: <MdEmojiFoodBeverage className="text-2xl" />,
	},
	{
		name: "Active Users",
		path: "/store/users/active-users",
		icon: <FaUsers className="text-2xl" />,
	},
];

const Sidebar = () => {
	const { openSidebar, setOpenSidebar } = useGlobals();

	const DrawerList = (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				{navLinks.map(({ name, path, icon }) => (
					<ListItem key={name} disablePadding>
						<ListItemButton
							component={NavLink}
							to={path}
							onClick={() => setOpenSidebar(false)}
						>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText primary={name} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
		</Box>
	);

	return (
		<Drawer open={openSidebar} onClose={() => setOpenSidebar(false)}>
			<motion.div
				initial={{ x: -50 }}
				animate={{ x: 0 }}
				exit={{ x: -50 }}
				transition={{ type: "spring", stiffness: 300 }}
				className="px-2"
			>
				<div className="flex border p-2 flex-col justify-center items-end">
					<span>
						<IoMdClose
							className="text-2xl cursor-pointer"
							onClick={() => setOpenSidebar(false)}
						/>
					</span>
					<div className="flex items-center space-x-2 justify-between w-full">
						<NavLink
							onClick={() => setOpenSidebar(false)}
							to={"/"}
							className="text-2xl font-semibold text-green-500"
						>
							My Fresh Market
						</NavLink>
						<img className="w-16 h-16" src="/img/logo/logo.webp" alt="" />
					</div>
				</div>
				{DrawerList}

				<div className="flex flex-col justify-center items-center px-2">
					<span>&copy; {new Date().getFullYear()} My Fresh Market</span>
					<span>All rights reserved.</span>
				</div>
			</motion.div>
		</Drawer>
	);
};

export default Sidebar;
