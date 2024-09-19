import React from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Container from "./Container";
import { retrieveDairyProducts } from "./selector";

// REDUX SELECTOR:
const dairyProductsRetriever = createSelector(
	retrieveDairyProducts,
	(dairyProductsSection) => ({ dairyProductsSection })
);

const DairyProducts = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { dairyProductsSection } = useSelector(dairyProductsRetriever);
	return (
		<Container
			moreLink="/store/products/dairy-products"
			sectionName={"Dairy Products Section"}
			productData={dairyProductsSection}
			cartItems={cartItems}
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
		/>
	);
};

export default DairyProducts;
