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
		setFreshProduce: (state, action) => {
			state.electronicsSection = action.payload;
		},
		setDairyProducts: (state, action) => {
			state.textTilesSection = action.payload;
		},
		setMeatPoultry: (state, action) => {
			state.homeLivingSection = action.payload;
		},
		setBakeryItems: (state, action) => {
			state.beautyCareSection = action.payload;
		},
		setCannedFoods: (state, action) => {
			state.sportsOutdoorsSection = action.payload;
		},
		setBeverages: (state, action) => {
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
	setFreshProduce,
	setDairyProducts,
	setMeatPoultry,
	setBakeryItems,
	setCannedFoods,
	setBeverages,
	setBooksMedia,
	setGrocery,
	setAutomotive,
	setHealthWellness,
	setTopUsers,
} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
