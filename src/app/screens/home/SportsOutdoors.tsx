import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveSportOutdoors } from "./selector";

// REDUX SELECTOR:
const sportsOutdoorsRetriever = createSelector(
	retrieveSportOutdoors,
	(sportsOutdoorsSection) => ({ sportsOutdoorsSection })
);
const SportsOutdoors = () => {
	const { sportsOutdoorsSection } = useSelector(sportsOutdoorsRetriever);

	console.log("sportsOutdoorsSection =>", sportsOutdoorsSection);
	return <div>SportsOutdoors</div>;
};

export default SportsOutdoors;
