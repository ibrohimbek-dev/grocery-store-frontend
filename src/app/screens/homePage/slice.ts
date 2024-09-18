import { HomePageState } from "../../../lib/types/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HomePageState = {
	freshProduceSection: [],
	diaryProductsSection: [],
	meatPoultrySection: [],
	bakeryItemsSection: [],
	cannedGoodsSection: [],
	baveragesSection: [],
	topUsers: [],
};

const homePageSlice = createSlice({
	name: "homePage",
	initialState,
	reducers: {
		setFreshProduce: (state, action) => {
			state.freshProduceSection = action.payload;
		},
		setDiaryProducts: (state, action) => {
			state.diaryProductsSection = action.payload;
		},
		setMeatPoultry: (state, action) => {
			state.meatPoultrySection = action.payload;
		},
		setBakeryItems: (state, action) => {
			state.bakeryItemsSection = action.payload;
		},
		setCannedFoods: (state, action) => {
			state.cannedGoodsSection = action.payload;
		},
		setBeverages: (state, action) => {
			state.baveragesSection = action.payload;
		},
		setTopUsers: (state, action) => {
			state.topUsers = action.payload;
		},
	},
});

export const {
	setFreshProduce,
	setDiaryProducts,
	setMeatPoultry,
	setBakeryItems,
	setCannedFoods,
	setBeverages,
	setTopUsers,
} = homePageSlice.actions;

const HomePageReducer = homePageSlice.reducer;

export default HomePageReducer;
