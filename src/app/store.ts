import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ModalProductPageReducer from "./components/modal/slice";
import HomePageReducer from "./screens/home/slice";
import OrderPageReducer from "./screens/orders/slice";

export const store = configureStore({
	reducer: {
		homePage: HomePageReducer,
		modalPage: ModalProductPageReducer,
		orderPage: OrderPageReducer,
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
