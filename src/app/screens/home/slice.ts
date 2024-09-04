import { HomePageState } from "../../../lib/types/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HomePageState = {
	electronicsSection: [],
	textTilesSection: [],
	homeLivingSection: [],
	beautyCareSection: [],
	sportsOutdoorsSection: [],
	toysGamesSection: [],
	booksMediaSection: [],
	grocerySection: [],
	automotiveSection: [],
	healthWellness: [],
	topUsers: [],
};

const homePageSlice = createSlice({
	name: "homePage",
	initialState,
	reducers: {
		setElectronics: (state, action) => {
			state.electronicsSection = action.payload;
		},
		setTextTiles: (state, action) => {
			state.textTilesSection = action.payload;
		},
		setHomeLiving: (state, action) => {
			state.homeLivingSection = action.payload;
		},
		setBeautyCare: (state, action) => {
			state.beautyCareSection = action.payload;
		},
		setSportsOutdoors: (state, action) => {
			state.sportsOutdoorsSection = action.payload;
		},
		setToysGames: (state, action) => {
			state.toysGamesSection = action.payload;
		},
		setBooksMedia: (state, action) => {
			state.booksMediaSection = action.payload;
		},
		setGrocery: (state, action) => {
			state.grocerySection = action.payload;
		},
		setAutomotive: (state, action) => {
			state.automotiveSection = action.payload;
		},
		setHealthWellness: (state, action) => {
			state.healthWellness = action.payload;
		},
		setTopUsers: (state, action) => {
			state.topUsers = action.payload;
		},
	},
});

export const {
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
} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
