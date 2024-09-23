import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Container from "./Container";
import { HomeComponentProps } from "../../../lib/types/common";
import { retrieveFreshProduce } from "./selector";

// REDUX SELECTOR:
const freshProduceRetriever = createSelector(
	retrieveFreshProduce,
	(freshProduceSection) => ({ freshProduceSection })
);

const FreshProduce = ({
	onAdd,
	cartItems,
	onDeleteAll,
}: HomeComponentProps) => {
	const { freshProduceSection } = useSelector(freshProduceRetriever);

	return (
		<Container
			moreLink="/store/products/fresh-produce"
			sectionName={"Fresh Produce Section"}
			productData={freshProduceSection}
			cartItems={cartItems}
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
		/>
	);
};

export default FreshProduce;
