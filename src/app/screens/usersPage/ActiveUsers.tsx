import { Dispatch, createSelector } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { User, UserInquiry } from "../../../lib/types/user";
import { setActiveUsers } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobal";
import { retrieveActiveUsers } from "./selector";
import UserService from "../../services/UserService";
import Container from "./Container";

// REDUX SLICE & SELECTOR:
const actionDispatch = (dispatch: Dispatch) => ({
	setActiveUsers: (data: User[]) => dispatch(setActiveUsers(data)),
});

const activeUsersRetriver = createSelector(
	retrieveActiveUsers,
	(activeUsersSection) => ({ activeUsersSection })
);

const ActiveUsers = () => {
	const { setActiveUsers } = actionDispatch(useDispatch());
  const { setOrderBuilder, updateNum } = useGlobals();
  const { activeUsersSection } = useSelector(activeUsersRetriver);
  

	const [userSearch, setUserSearch] = useState<UserInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		search: "",
	});

	useEffect(() => {
		const userService = new UserService();
		setOrderBuilder(new Date());

		userService
			.getAllUsersBySort(userSearch)
			.then((data) => setActiveUsers(data))
			.catch((err) => console.log("Error on ActiveUsers.tsx =>", err));
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSearch, updateNum]);
  

	return (
		<Container
			userData={activeUsersSection}
			userSearch={userSearch}
			setUserSearch={setUserSearch}
		/>
	);
};

export default ActiveUsers;
