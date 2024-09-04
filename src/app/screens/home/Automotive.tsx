import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveAutomotive } from "./selector";

// REDUX SELECTOR:
const automotiveSectionRetriever = createSelector(
	retrieveAutomotive,
	(automotiveSection) => ({ automotiveSection })
);

const Automotive = () => {
	const { automotiveSection } = useSelector(automotiveSectionRetriever);

	console.log("automotiveSection =>", automotiveSection);
	return <div>Automotive</div>;
};

export default Automotive;
