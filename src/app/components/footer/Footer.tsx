import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaLinkedin, FaTelegram } from "react-icons/fa";
import { useGlobals } from "../../hooks/useGlobal";

const Footer = () => {
	const { authUser } = useGlobals();

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="bg-green-800 pt-4 text-white w-full"
		>
			<div className="main-container 3xl:flex hidden mx-auto flex-col md:flex-row justify-between">
				<div className="flex flex-col mb-8 md:mb-0">
					<img
						className="w-16 h-16 cursor-pointer hover:animate-spin duration-700 ease-linear"
						alt="Logo"
						src="/img/logo/logo.webp"
					/>
					<p className="mt-4 text-sm">
						Your one-stop shop for fresh produce, groceries, and everyday
						essentials. We strive to provide the best quality and service to our
						customers.
					</p>
					<div className="flex justify-start space-x-6 mt-6">
						<NavLink
							to="https://www.linkedin.com/in/ibrohimbek-dev"
							target="_blank"
						>
							<FaLinkedin className="text-2xl hover:scale-110 duration-200 transition-all ease-linear cursor-pointer text-white" />
						</NavLink>
						<NavLink to="https://www.instagram.com/ibek0127" target="_blank">
							<FaInstagram className="text-2xl hover:scale-110 duration-200 transition-all ease-linear cursor-pointer text-white" />
						</NavLink>
						<NavLink to="https://t.me/devcode0101" target="_blank">
							<FaTelegram className="text-2xl hover:scale-110 duration-200 transition-all ease-linear cursor-pointer text-white" />
						</NavLink>
						<NavLink to="https://www.youtube.com/@devcode0101" target="_blank">
							<FaYoutube className="text-2xl hover:scale-110 duration-200 transition-all ease-linear cursor-pointer text-white" />
						</NavLink>
					</div>
				</div>
				<div className="flex space-x-16">
					<div>
						<h3 className="text-lg font-semibold mb-1">Categories</h3>
						<div className="flex flex-col space-y-2">
							<NavLink to="/" className="block text-sm hover:text-blue-400">
								Home
							</NavLink>
							<NavLink
								to="/store/products/fresh-produce"
								className="block text-sm hover:text-blue-400"
							>
								Products
							</NavLink>
							{authUser && (
								<NavLink
									to="/store/orders"
									className="block text-sm hover:text-blue-400"
								>
									My Orders
								</NavLink>
							)}
							<NavLink
								to="/store/users/active-users"
								className="block text-sm hover:text-blue-400"
							>
								Active Users
							</NavLink>
							<NavLink
								to="/store/help-page"
								className="block text-sm hover:text-blue-400"
							>
								Help Center
							</NavLink>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-2">Contact Us</h3>
						<div className="space-y-4 flex flex-col">
							<div className="flex items-center">
								<span className="font-bold mr-2">Location:</span>
								<div className="">123 Grocery St, Dubai</div>
							</div>
							<div className="flex items-center">
								<span className="font-bold mr-2">Phone:</span>
								<div className="">+971 4 554 7777</div>
							</div>
							<div className="flex items-center">
								<span className="font-bold mr-2">Email:</span>
								<div className="">support@grocerystore.com</div>
							</div>
							<div className="flex items-center">
								<span className="font-bold mr-2">Hours:</span>
								<div className="">Open 24/7</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t border-white mt-8 opacity-50"></div>
			<div className="text-center flex flex-col mt-4 mb-2 text-sm">
				<span>{new Date().getFullYear()} My Fresh Market</span>
				<span>&copy; Copyright Grocery Store, All rights reserved.</span>
			</div>
		</motion.div>
	);
};

export default Footer;
