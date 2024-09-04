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
	setBeautyCare,
	setBooksMedia,
	setElectronics,
	setGrocery,
	setHealthWellness,
	setHomeLiving,
	setSportsOutdoors,
	setTextTiles,
	setTopUsers,
	setToysGames,
} from "./slice";
import Electronics from "./Electronics";
import AdsMediaSection from "./AdsMediaSection";
import TopUsers from "./TopUsers";
import { CardActionsProps } from "../../../lib/types/common";

// REDUX SLICE:
const actionDispatch = (dispatch: Dispatch) => ({
	setElectronics: (data: Product[]) => dispatch(setElectronics(data)),
	setTextTiles: (data: Product[]) => dispatch(setTextTiles(data)),
	setHomeLiving: (data: Product[]) => dispatch(setHomeLiving(data)),
	setBeautyCare: (data: Product[]) => dispatch(setBeautyCare(data)),
	setSportsOutdoors: (data: Product[]) => dispatch(setSportsOutdoors(data)),
	setToysGames: (data: Product[]) => dispatch(setToysGames(data)),
	setBooksMedia: (data: Product[]) => dispatch(setBooksMedia(data)),
	setGrocery: (data: Product[]) => dispatch(setGrocery(data)),
	setAutomotive: (data: Product[]) => dispatch(setAutomotive(data)),
	setHealthWellness: (data: Product[]) => dispatch(setHealthWellness(data)),
	setTopUsers: (data: User[]) => dispatch(setTopUsers(data)),
});

const HomePage = ({ onAdd }: CardActionsProps) => {
  
	const {
		setElectronics,
		setTextTiles,
		setHomeLiving,
		setBeautyCare,
		setSportsOutdoors,
		setToysGames,
		setBooksMedia,
		setGrocery,
		setAutomotive,
		setHealthWellness,
		setTopUsers,
  } = actionDispatch(useDispatch());
  


	useEffect(() => {
		const productService = new ProductService();
		const userService = new UserService();

		// TODO: page & limit ustida ishlashim kerak

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.ELECTRONICS,
			})
			.then((data) => setElectronics(data))
			.catch((err) => console.log("Error on data setElectronics =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.TEXT_TILES,
			})
			.then((data) => setTextTiles(data))
			.catch((err) => console.log("Error on data setTextTiles =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.HOME_AND_LIVING,
			})
			.then((data) => setHomeLiving(data))
			.catch((err) => console.log("Error on data setHomeLiving =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.BEAUTY_AND_PERSONAL_CARE,
			})
			.then((data) => setBeautyCare(data))
			.catch((err) => console.log("Error on data setBeautyCare =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.SPORTS_AND_OUTDOORS,
			})
			.then((data) => setSportsOutdoors(data))
			.catch((err) => console.log("Error on data setSportsOutdoors =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.TOYS_AND_GAMES,
			})
			.then((data) => setToysGames(data))
			.catch((err) => console.log("Error on data setToysGames =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.BOOKS_AND_MEDIA,
			})
			.then((data) => setBooksMedia(data))
			.catch((err) => console.log("Error on data setBooksMedia =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.GROCERY,
			})
			.then((data) => setGrocery(data))
			.catch((err) => console.log("Error on data setGrocery =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 20,
				order: "productViews",
				productCollection: ProductCollection.AUTOMOTIVE,
			})
			.then((data) => setAutomotive(data))
			.catch((err) => console.log("Error on data setAutomotive =>", err));

		productService
			.getProductsBySort({
				page: 1,
				limit: 7,
				order: "productViews",
				productCollection: ProductCollection.HEALTH_AND_WELLNESS,
			})
			.then((data) => setHealthWellness(data))
			.catch((err) => console.log("Error on data setHealthWellness =>", err));

		// Get top users:
		userService
			.getTopUsers()
			.then((data) => setTopUsers(data))
			.catch((err) => console.log("Error on setTopUsers =>", err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="border-4 border-yellow-400 overflow-hidden w-full flex flex-row justify-center items-center">
			<div className="flex flex-col w-full items-center space-y-10 mt-4">
				<HeroSlider />
				<Electronics onAdd={onAdd} />
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
