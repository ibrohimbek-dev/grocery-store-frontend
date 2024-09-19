import React from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import Container from "./Container";
import { retrieveBakeryItems } from "./selector";


// REDUX SLICE & SELECTOR
const bakeryItemsRetriever = createSelector(
	retrieveBakeryItems,
	(bakeryItemsSection) => ({ bakeryItemsSection })
);

const BakeryItems = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
  const { bakeryItemsSection } = useSelector(bakeryItemsRetriever);


  return <Container
    moreLink="/store/products/bakery-items"
    sectionName={"Bakery Items Section"}
    productData={bakeryItemsSection}
    cartItems={cartItems}
    onAdd={onAdd}
    onDeleteAll={onDeleteAll}
  />
}

export default BakeryItems;
