import { createSlice } from "@reduxjs/toolkit";
import { SearchProductState } from "../../../lib/types/screen";

const initialState: SearchProductState = {
	searchText: "",
};

const searchTextSlice = createSlice({
	name: "searchProduct",
	initialState,
	reducers: {
		setSearchQuery: (state, action) => {
			state.searchText = action.payload;
		},
	},
});

export const { setSearchQuery } = searchTextSlice.actions;
const SearchProductReducer = searchTextSlice.reducer;

export default SearchProductReducer;
