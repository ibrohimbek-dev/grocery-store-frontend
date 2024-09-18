import { createSelector } from "@reduxjs/toolkit";
import { AppRootState, UsersPagetState } from "../../../lib/types/screen";

const selectUsersPage = (state: AppRootState) => state.usersPage;

export const retrieveActiveUsers = createSelector(
	selectUsersPage,
	(UsersPage: UsersPagetState) => UsersPage.activeUsers
);
