import React from "react";
import {  HomeComponentProps } from "../../../lib/types/common";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Container from "./Container";
import { retrieveBeverages } from "./selector";

// REDUX SLICE & SELECTOR
const beveragesRetriever = createSelector(
	retrieveBeverages,
	(beveragesSection) => ({ beveragesSection })
);

const Beverages = ({ onAdd, cartItems, onDeleteAll }: HomeComponentProps) => {
	const { beveragesSection } = useSelector(beveragesRetriever);

	return (
		<Container
			moreLink="/store/products/beverages"
			sectionName={"Beverages Section"}
			productData={beveragesSection}
			cartItems={cartItems}
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
		/>
	);
};

export default Beverages;
