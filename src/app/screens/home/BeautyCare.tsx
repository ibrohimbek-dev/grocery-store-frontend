import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveBeautyCare } from "./selector";

// REDUX SELECTOR:
const beautyCareSectionRetriever = createSelector(
	retrieveBeautyCare,
	(beautyCareSection) => ({ beautyCareSection })
);

const BeautyCare = () => {
  const { beautyCareSection } = useSelector(beautyCareSectionRetriever);
  
  console.log("beautyCareSection =>", beautyCareSection);
	return <div>BeautyCare</div>;
};

export default BeautyCare;
