import React, { useEffect } from "react";
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
	setDiaryProducts,
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

// REDUX SLICE:
const actionDispatch = (dispatch: Dispatch) => ({
	setFreshProduce: (data: Product[]) => dispatch(setFreshProduce(data)),
	setDiaryProducts: (data: Product[]) => dispatch(setDiaryProducts(data)),
	setMeatPoultry: (data: Product[]) => dispatch(setMeatPoultry(data)),
	setBakeryItems: (data: Product[]) => dispatch(setBakeryItems(data)),
	setCannedFoods: (data: Product[]) => dispatch(setCannedFoods(data)),
	setBeverages: (data: Product[]) => dispatch(setBeverages(data)),
	setTopUsers: (data: User[]) => dispatch(setTopUsers(data)),
});

const HomePage = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const {
		setFreshProduce,
		setDiaryProducts,
		setMeatPoultry,
		setBakeryItems,
		setCannedFoods,
		setBeverages,
		setTopUsers,
	} = actionDispatch(useDispatch());

	const { setOrderBuilder, updateNum } = useGlobals();

	useEffect(() => {
		const productService = new ProductService();
		const userService = new UserService();
		setOrderBuilder(new Date());

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.FRESH_PRODUCE,
			})
			.then((data) => setFreshProduce(data))
			.catch((err) => console.log("Error on data setFreshProduce =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.DAIRY_PRODUCTS,
			})
			.then((data) => setDiaryProducts(data))
			.catch((err) => console.log("Error on data setDiaryProducts =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.MEAT_AND_POULTRY,
			})
			.then((data) => setMeatPoultry(data))
			.catch((err) => console.log("Error on data setMeatPoultry =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.BAKERY_ITEMS,
			})
			.then((data) => setBakeryItems(data))
			.catch((err) => console.log("Error on data setBakeryItems =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.CANNED_GOODS,
			})
			.then((data) => setCannedFoods(data))
			.catch((err) => console.log("Error on data setCannedFoods =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
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

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="border-4 border-yellow-400 overflow-hidden w-full flex flex-row justify-center items-center"
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
				</>
				<TopUsers />
			</div>
		</motion.div>
	);
};

export default HomePage;
