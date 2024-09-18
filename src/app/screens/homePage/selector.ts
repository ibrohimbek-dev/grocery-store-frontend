import { createSelector } from "@reduxjs/toolkit";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveFreshProduce = createSelector(
	selectHomePage,
	(HomePage: HomePageState) => HomePage.freshProduceSection
);

export const retrieveDairyProducts = createSelector(
	selectHomePage,
	(HomePage: HomePageState) => HomePage.dairyProductsSection
);

export const retrieveMeatPoultry = createSelector(
	selectHomePage,
	(HomePage: HomePageState) => HomePage.meatPoultrySection
);

export const retrieveBakeryItems = createSelector(
	selectHomePage,
	(HomePage: HomePageState) => HomePage.bakeryItemsSection
);

export const retrieveCannedFoods = createSelector(
	selectHomePage,
	(HomePage: HomePageState) => HomePage.cannedGoodsSection
);

export const retrieveBeverages = createSelector(
	selectHomePage,
	(HomePage: HomePageState) => HomePage.baveragesSection
);

export const retrieveTopUsers = createSelector(
	selectHomePage,
	(HomePage: HomePageState) => HomePage.topUsers
);
