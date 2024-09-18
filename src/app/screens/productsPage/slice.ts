import { ProductsPageState } from "../../../lib/types/screen";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProductsPageState = {
	freshProduceSection: [],
	diaryProductsSection: [],
	meatPoultrySection: [],
	bakeryItemsSection: [],
	cannedGoodsSection: [],
	baveragesSection: [],
	discounts: [],
	recommends: [],
	ads: [],	
};

const productPageSlice = createSlice({
	name: "productPage",
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
		setDiscounts: (state, action) => {
			state.discounts = action.payload;
		},
		setRecommends: (state, action) => {
			state.recommends = action.payload;
		},
		setAds: (state, action) => {
			state.ads = action.payload;
		}
	},
});

export const {
	setFreshProduce,
	setDiaryProducts,
	setMeatPoultry,
	setBakeryItems,
	setCannedFoods,
	setBeverages,
	setDiscounts,
	setRecommends,
	setAds,
} = productPageSlice.actions;

const ProductPageReducer = productPageSlice.reducer;
export default ProductPageReducer;
