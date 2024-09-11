import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveElectronics } from "./selector";
import Container from "./Container";
import { CardActionsProps } from "../../../lib/types/common";

// REDUX SELECTOR:
const electronicsRetriever = createSelector(
	retrieveElectronics,
	(electronicsSection) => ({ electronicsSection })
);

const Electronics = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { electronicsSection } = useSelector(electronicsRetriever);

	console.log("electronicsSection =>", electronicsSection);

	return (
		<Container
			moreLink="/store/electronics"
			sectionName={"Electronics section"}
			productData={electronicsSection}
			cartItems={cartItems}
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
		/>
	);
};

export default Electronics;
