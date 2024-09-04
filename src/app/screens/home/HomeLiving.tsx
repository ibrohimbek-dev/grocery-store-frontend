import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveHomeLiving } from "./selector";

// REDUX SELECTOR:
const homeLivingRetriever = createSelector(
	retrieveHomeLiving,
	(homeLivingSection) => ({ homeLivingSection })
);

const HomeLiving = () => {
	const { homeLivingSection } = useSelector(homeLivingRetriever);

	console.log("homeLivingSection =>", homeLivingSection);

	return <div>HomeLiving</div>;
};

export default HomeLiving;
