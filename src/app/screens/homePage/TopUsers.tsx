import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";

// REDUX SELECTOR:
const topUsersRetriever = createSelector(
	retrieveTopUsers,
	(topUsersSection) => ({ topUsersSection })
);
const TopUsers = () => {
	const { topUsersSection } = useSelector(topUsersRetriever);

	console.log("topUsersSection =>", topUsersSection);
	return <div>TopUsers</div>;
};

export default TopUsers;
