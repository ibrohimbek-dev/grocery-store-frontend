import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";

const selectModalPage = (state: AppRootState) => state.modalPage;

export const retrieveModalProduct = createSelector(
	selectModalPage,
	(ModalPage) => ModalPage.modalProduct
);
