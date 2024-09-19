import React, { useEffect, useState } from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import Container from "./Container";
import { setBakeryItems } from "./slice";
import { retrieveBakeryItems } from "./selector";
import { useGlobals } from "../../hooks/useGlobal";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setBakeryItems: (data: Product[]) => dispatch(setBakeryItems(data)),
});

const bakeryItemsRetriever = createSelector(
	retrieveBakeryItems,
	(bakeryItemsSection) => ({ bakeryItemsSection })
);

const BakeryItems = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { setBakeryItems } = actionDispatch(useDispatch());
	const { bakeryItemsSection } = useSelector(bakeryItemsRetriever);
	const { updateNum } = useGlobals();

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productCollection: ProductCollection.BAKERY_ITEMS,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setBakeryItems(data))
			.catch((err) => console.log("Error on BakeryItems.tsx"));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch, updateNum]);

	return (
		<Container
			productData={bakeryItemsSection}
			sectionName="Bakery Items"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default BakeryItems;
