import React, { useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import ProductService from "../../services/ProductService";
import { Product } from "../../../lib/types/product";
import { User } from "../../../lib/types/user";
import UserService from "../../services/UserService";
import HeroSlider from "./HeroSlider";
import { ProductCollection } from "../../../lib/enums/product.enum";
import TextTiles from "./TextTiles";

import BeautyCare from "./BeautyCare";
import SportsOutdoors from "./SportsOutdoors";
import ToysGames from "./ToysGames";
import BooksMedia from "./BooksMedia";
import Grocery from "./Grocery";
import Automotive from "./Automotive";
import HealthWellness from "./HealthWellness";
import HomeLiving from "./HomeLiving";
import {
	setAutomotive,
	setBakeryItems,
	setBooksMedia,
	setFreshProduce,
	setGrocery,
	setHealthWellness,
	setMeatPoultry,
	setCannedFoods,
	setDairyProducts,
	setTopUsers,
	setBeverages,
} from "./slice";
import Electronics from "./Electronics";
import AdsMediaSection from "./AdsMediaSection";
import TopUsers from "./TopUsers";
import { CardActionsProps } from "../../../lib/types/common";
import { useGlobals } from "../../hooks/useGlobal";

// REDUX SLICE:
const actionDispatch = (dispatch: Dispatch) => ({
	setFreshProduce: (data: Product[]) => dispatch(setFreshProduce(data)),
	setDairyProducts: (data: Product[]) => dispatch(setDairyProducts(data)),
	setMeatPoultry: (data: Product[]) => dispatch(setMeatPoultry(data)),
	setBakeryItems: (data: Product[]) => dispatch(setBakeryItems(data)),
	setCannedFoods: (data: Product[]) => dispatch(setCannedFoods(data)),
	setBeverages: (data: Product[]) => dispatch(setBeverages(data)),
	setBooksMedia: (data: Product[]) => dispatch(setBooksMedia(data)),
	setGrocery: (data: Product[]) => dispatch(setGrocery(data)),
	setAutomotive: (data: Product[]) => dispatch(setAutomotive(data)),
	setHealthWellness: (data: Product[]) => dispatch(setHealthWellness(data)),
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

	const { setOrderBuilder, updateNum } = useGlobals();

	useEffect(() => {
		const productService = new ProductService();
		const userService = new UserService();
		setOrderBuilder(new Date());

		// TODO: page & limit ustida ishlashim kerak

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
			.then((data) => setDairyProducts(data))
			.catch((err) => console.log("Error on data setDairyProducts =>", err));

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
		<div className="border-4 border-yellow-400 overflow-hidden w-full flex flex-row justify-center items-center">
			<div className="flex flex-col w-full items-center space-y-10 mt-4">
				<HeroSlider />
				<Electronics
					cartItems={cartItems}
					onAdd={onAdd}
					onDeleteAll={onDeleteAll}
				/>
				<TextTiles />
				<HomeLiving />
				<BeautyCare />
				<SportsOutdoors />
				<ToysGames />
				<BooksMedia />
				<Grocery />
				<Automotive />
				<HealthWellness />
				<AdsMediaSection />
				<TopUsers />
			</div>
		</div>
	);
};

export default HomePage;
