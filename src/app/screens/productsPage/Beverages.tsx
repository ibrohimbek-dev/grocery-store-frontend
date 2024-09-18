import React, { useEffect, useState } from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import Container from "./Container";
import { setBeverages } from "./slice";
import { retrieveBeverages } from "./selector";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setBeverages: (data: Product[]) => dispatch(setBeverages(data)),
});

const beveragesRetriever = createSelector(
	retrieveBeverages,
	(beveragesSection) => ({ beveragesSection })
);

const Beverages = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { setBeverages } = actionDispatch(useDispatch());
	const { beveragesSection } = useSelector(beveragesRetriever);

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productCollection: ProductCollection.BEVERAGES,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setBeverages(data))
			.catch((err) => console.log("Error on Beverages.tsx"));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch]);

	return (
		<Container
			productData={beveragesSection}
			sectionName="Beverages"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default Beverages;
