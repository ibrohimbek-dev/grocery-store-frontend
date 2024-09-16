import { createSelector } from "@reduxjs/toolkit";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveFreshProduce = createSelector(
	selectHomePage,
	(homePage: HomePageState) => homePage.freshProduceSection
);

export const retrieveDairyProducts = createSelector(
	selectHomePage,
	(homePage: HomePageState) => homePage.dairyProductsSection
);

export const retrieveMeatPoultry = createSelector(
	selectHomePage,
	(homePage: HomePageState) => homePage.meatPoultrySection
);

export const retrieveBakeryItems = createSelector(
	selectHomePage,
	(homePage: HomePageState) => homePage.bakeryItemsSection
);

export const retrieveCannedGoods = createSelector(
	selectHomePage,
	(homePage: HomePageState) => homePage.cannedGoodsSection
);

export const retrieveBeverages = createSelector(
	selectHomePage,
	(homePage: HomePageState) => homePage.baveragesSection
);

export const retrieveTopUsers = createSelector(
	selectHomePage,
	(homePage: HomePageState) => homePage.topUsers
);
