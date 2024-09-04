import { createSlice } from "@reduxjs/toolkit";
import { ModalProductState } from "../../../lib/types/screen";

const initialState: ModalProductState = {
	modalProduct: null,
};

const modalProductPageSlice = createSlice({
	name: "modalPage",
	initialState,
	reducers: {
		setModalProduct: (state, action) => {
			state.modalProduct = action.payload;
		},
	},
});

export const { setModalProduct } = modalProductPageSlice.actions;

const ModalProductPageReducer = modalProductPageSlice.reducer;

export default ModalProductPageReducer;
