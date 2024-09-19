import React from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Container from "./Container";
import { retrieveCannedFoods } from "./selector";

// REDUX SLICE & SELECTOR
const cannedFoodRetriever = createSelector(
	retrieveCannedFoods,
	(cannedFoodsSection) => ({ cannedFoodsSection })
);

const CannedFoods = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { cannedFoodsSection } = useSelector(cannedFoodRetriever);
	return (
		<Container
			moreLink="/store/products/canned-foods"
			sectionName={"Canned Foods Section"}
			productData={cannedFoodsSection}
			cartItems={cartItems}
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
		/>
	);
};

export default CannedFoods;
