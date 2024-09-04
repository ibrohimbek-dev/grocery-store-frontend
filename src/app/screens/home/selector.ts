import { AppRootState } from "../../../lib/types/screen";
import { createSelector } from "@reduxjs/toolkit";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveElectronics = createSelector(
	selectHomePage,
	(HomePage) => HomePage.electronicsSection
);
export const retrieveTextTiles = createSelector(
	selectHomePage,
	(HomePage) => HomePage.textTilesSection
);
export const retrieveHomeLiving = createSelector(
	selectHomePage,
	(HomePage) => HomePage.homeLivingSection
);
export const retrieveBeautyCare = createSelector(
	selectHomePage,
	(HomePage) => HomePage.beautyCareSection
);
export const retrieveSportOutdoors = createSelector(
	selectHomePage,
	(HomePage) => HomePage.sportsOutdoorsSection
);
export const retrieveToysGames = createSelector(
	selectHomePage,
	(HomePage) => HomePage.toysGamesSection
);
export const retrieveBooksMedia = createSelector(
	selectHomePage,
	(HomePage) => HomePage.booksMediaSection
);
export const retrieveGrocery = createSelector(
	selectHomePage,
	(HomePage) => HomePage.grocerySection
);
export const retrieveAutomotive = createSelector(
	selectHomePage,
	(HomePage) => HomePage.automotiveSection
);
export const retrieveHealthWellness = createSelector(
	selectHomePage,
	(HomePage) => HomePage.healthWellness
);
export const retrieveTopUsers = createSelector(
	selectHomePage,
	(HomePage) => HomePage.topUsers
);
