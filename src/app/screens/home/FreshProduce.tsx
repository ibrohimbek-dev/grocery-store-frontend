import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Container from "./Container";
import { CardActionsProps } from "../../../lib/types/common";
import { retrieveFreshProduce } from "./selector";

// REDUX SELECTOR:
const freshProduceRetriever = createSelector(
	retrieveFreshProduce,
	(freshProduceSection) => ({ freshProduceSection })
);

const FreshProduce = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
		const { freshProduceSection } = useSelector(freshProduceRetriever);

		console.log("freshProduceSection =>", freshProduceSection);

		return (
			<Container
				moreLink="/store/fresh-produce"
				sectionName={"Fresh Produce Section section"}
				productData={freshProduceSection}
				cartItems={cartItems}
				onAdd={onAdd}
				onDeleteAll={onDeleteAll}
			/>
		);
};

export default FreshProduce;
