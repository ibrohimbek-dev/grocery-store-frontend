import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveGrocery } from "./selector";

// REDUX SELECTOR:
const groceryRetriever = createSelector(retrieveGrocery, (grocerySection) => ({
	grocerySection,
}));
const Grocery = () => {
	const { grocerySection } = useSelector(groceryRetriever);

	console.log("grocerySection =>", grocerySection);
	return <div>Grocery</div>;
};

export default Grocery;
