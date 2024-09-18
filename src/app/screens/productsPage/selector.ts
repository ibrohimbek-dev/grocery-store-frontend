import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productPage;

export const retrieveFreshProduce = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.freshProduceSection
);

export const retrieveDairyProducts = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.dairyProductsSection
);

export const retrieveMeatPoultry = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.meatPoultrySection
);

export const retrieveBakeryItems = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.bakeryItemsSection
);

export const retrieveCannedFoods = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.cannedGoodsSection
);

export const retrieveBeverages = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.baveragesSection
);

export const retrieveRecommends = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.recommends
);
export const retrieveDiscounts = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.discounts
);
export const retrieveAds = createSelector(
	selectProductsPage,
	(ProductPage) => ProductPage.ads
);
