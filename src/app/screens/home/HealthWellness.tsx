import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveHealthWellness } from "./selector";

// REDUX SELECTOR:
const healthWellnessRetriever = createSelector(
	retrieveHealthWellness,
	(healthWellnessSection) => ({ healthWellnessSection })
);
const HealthWellness = () => {
	const { healthWellnessSection } = useSelector(healthWellnessRetriever);

	console.log("healthWellnessSection =>", healthWellnessSection);

	return <div>HealthWellness</div>;
};

export default HealthWellness;
