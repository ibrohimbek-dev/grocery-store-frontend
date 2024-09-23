import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ModalProductPageReducer from "./components/modal/slice";
import HomePageReducer from "./screens/homePage/slice";
import OrderPageReducer from "./screens/ordersPage/slice";
import ProductPageReducer from "./screens/productsPage/slice";
import usersPageReducer from "./screens/usersPage/slice";
import SearchProductReducer from "./components/header/searchSlice";

export const store = configureStore({
	reducer: {
		homePage: HomePageReducer,
		productPage: ProductPageReducer,
		orderPage: OrderPageReducer,
		usersPage: usersPageReducer,
		modalPage: ModalProductPageReducer,
		searchProduct: SearchProductReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
