import { createSlice } from "@reduxjs/toolkit";
import { UsersPagetState } from "../../../lib/types/screen";

const initialState: UsersPagetState = {
	activeUsers: [],
};

const userPageSlice = createSlice({
	name: "usersPage",
	initialState,
	reducers: {
		setActiveUsers: (state, action) => {
			state.activeUsers = action.payload;
		},
	},
});

export const { setActiveUsers } = userPageSlice.actions;
const usersPageReducer = userPageSlice.reducer;

export default usersPageReducer;
