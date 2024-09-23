import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";

const selectSearchText = (state: AppRootState) => state.searchProduct

export const retrieveSearchText = createSelector(
	selectSearchText,
	(SearchText) => SearchText?.searchText
);
