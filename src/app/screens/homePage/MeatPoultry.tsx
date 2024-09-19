import React from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Container from "./Container";
import { retrieveMeatPoultry } from "./selector";

// REDUX SLICE & SELECTOR
const meatPoultryRetriever = createSelector(
	retrieveMeatPoultry,
	(meatPoultrySection) => ({ meatPoultrySection })
);

const MeatPoultry = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { meatPoultrySection } = useSelector(meatPoultryRetriever);
	return (
		<Container
			moreLink="/store/products/meat-poultry"
			sectionName={"Meat And Poultry Section"}
			productData={meatPoultrySection}
			cartItems={cartItems}
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
		/>
	);
};

export default MeatPoultry;
