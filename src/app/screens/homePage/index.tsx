import React, { useEffect, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ProductService from "../../services/ProductService";
import { Product } from "../../../lib/types/product";
import { User } from "../../../lib/types/user";
import UserService from "../../services/UserService";
import HeroSlider from "./HeroSlider";
import { ProductCollection } from "../../../lib/enums/product.enum";
import {
	setFreshProduce,
	setMeatPoultry,
	setCannedFoods,
	setDairyProducts,
	setTopUsers,
	setBeverages,
	setBakeryItems,
} from "./slice";
import TopUsers from "./TopUsers";
import { CardActionsProps } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobal";
import FreshProduce from "./FreshProduce";
import DairyProducts from "./DairyProducts";
import MeatPoultry from "./MeatPoultry";
import BakeryItems from "./BakeryItems";
import CannedFoods from "./CannedFoods";
import Beverages from "./Beverages";
import { motion } from "framer-motion";
import { MdContactPhone } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { NavLink } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

// REDUX SLICE:
const actionDispatch = (dispatch: Dispatch) => ({
	setFreshProduce: (data: Product[]) => dispatch(setFreshProduce(data)),
	setDairyProducts: (data: Product[]) => dispatch(setDairyProducts(data)),
	setMeatPoultry: (data: Product[]) => dispatch(setMeatPoultry(data)),
	setBakeryItems: (data: Product[]) => dispatch(setBakeryItems(data)),
	setCannedFoods: (data: Product[]) => dispatch(setCannedFoods(data)),
	setBeverages: (data: Product[]) => dispatch(setBeverages(data)),
	setTopUsers: (data: User[]) => dispatch(setTopUsers(data)),
});

const HomePage = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const {
		setFreshProduce,
		setDairyProducts,
		setMeatPoultry,
		setBakeryItems,
		setCannedFoods,
		setBeverages,
		setTopUsers,
	} = actionDispatch(useDispatch());

	const [isScrolled, setIsScrolled] = useState<boolean>(false);
	const { setOrderBuilder, updateNum } = useGlobals();

	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;

		if (scrollTop > 40) {
			setIsScrolled(true);
		} else {
			setIsScrolled(false);
		}

		if (scrollTop + windowHeight >= documentHeight) {
			setIsScrolled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		const productService = new ProductService();
		const userService = new UserService();
		setOrderBuilder(new Date());

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "createdAt",
				productCollection: ProductCollection.FRESH_PRODUCE,
			})
			.then((data) => setFreshProduce(data))
			.catch((err) => console.log("Error on data setFreshProduce =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "createdAt",
				productCollection: ProductCollection.DAIRY_PRODUCTS,
			})
			.then((data) => setDairyProducts(data))
			.catch((err) => console.log("Error on data setDairyProducts =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "createdAt",
				productCollection: ProductCollection.MEAT_AND_POULTRY,
			})
			.then((data) => setMeatPoultry(data))
			.catch((err) => console.log("Error on data setMeatPoultry =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "createdAt",
				productCollection: ProductCollection.BAKERY_ITEMS,
			})
			.then((data) => setBakeryItems(data))
			.catch((err) => console.log("Error on data setBakeryItems =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "createdAt",
				productCollection: ProductCollection.CANNED_FOODS,
			})
			.then((data) => setCannedFoods(data))
			.catch((err) => console.log("Error on data setCannedFoods =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "createdAt",
				productCollection: ProductCollection.BEVERAGES,
			})
			.then((data) => setBeverages(data))
			.catch((err) => console.log("Error on data setBeverages =>", err));

		// Get top users:
		userService
			.getTopUsers()
			.then((data) => setTopUsers(data))
			.catch((err) => console.log("Error on setTopUsers =>", err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateNum]);

	const scrollToTop = () => {
		setIsScrolled(false);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className=" overflow-hidden w-full flex flex-row justify-center items-center"
		>
			<div className="flex flex-col w-full items-center space-y-10 mt-4">
				<HeroSlider />
				<>
					<FreshProduce
						cartItems={cartItems}
						onAdd={onAdd}
						onDeleteAll={onDeleteAll}
					/>
					<DairyProducts
						cartItems={cartItems}
						onAdd={onAdd}
						onDeleteAll={onDeleteAll}
					/>
					<MeatPoultry
						cartItems={cartItems}
						onAdd={onAdd}
						onDeleteAll={onDeleteAll}
					/>
					<BakeryItems
						cartItems={cartItems}
						onAdd={onAdd}
						onDeleteAll={onDeleteAll}
					/>
					<CannedFoods
						cartItems={cartItems}
						onAdd={onAdd}
						onDeleteAll={onDeleteAll}
					/>
					<Beverages
						cartItems={cartItems}
						onAdd={onAdd}
						onDeleteAll={onDeleteAll}
					/>
					<TopUsers />
				</>
			</div>

			<div className="fixed bottom-10 right-10">
				<Tooltip title="Contact Us" arrow enterDelay={200} leaveDelay={200}>
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={
							isScrolled ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
						}
						transition={{ duration: 0.3 }}
					>
						<button
							onClick={scrollToTop}
							className={`${
								isScrolled ? "flex" : "hidden"
							} items-center justify-center p-2 mt-4 rounded-full bg-gray-800 text-white hover:bg-gray-600 transition`}
						>
							<FaArrowUp className="text-xl hover:scale-110 duration-200 transition-all ease-linear cursor-pointer" />
						</button>
						<NavLink target="_blank" to={"http://ibrohimbek.link/"}>
							<MdContactPhone className="text-green-500 text-5xl hover:scale-110 transition-all ease-linear duration-200" />
						</NavLink>
					</motion.div>
				</Tooltip>
			</div>
		</motion.div>
	);
};

export default HomePage;
