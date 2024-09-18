import React, { useEffect, useState } from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductStatus } from "../../../lib/enums/product.enum";
import Container from "./Container";
import { setDiscounts } from "./slice";
import { retrieveDiscounts } from "./selector";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setDiscounts: (data: Product[]) => dispatch(setDiscounts(data)),
});

const discountsRetriever = createSelector(
	retrieveDiscounts,
	(discountsSection) => ({ discountsSection })
);

const Discounts = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { setDiscounts } = actionDispatch(useDispatch());
	const { discountsSection } = useSelector(discountsRetriever);

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productStatus: ProductStatus.DISCOUNT,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setDiscounts(data))
			.catch((err) => console.log("Error on Discounts.tsx", err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch]);
	return (
		<Container
			productData={discountsSection}
			sectionName="Discount Products"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default Discounts;
