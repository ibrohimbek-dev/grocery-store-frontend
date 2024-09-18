import React, { useEffect, useState } from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductStatus } from "../../../lib/enums/product.enum";
import Container from "./Container";
import { setRecommends } from "./slice";
import { retrieveRecommends } from "./selector";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setRecommends: (data: Product[]) => dispatch(setRecommends(data)),
});

const recommendsRetriever = createSelector(
	retrieveRecommends,
	(recommendsSection) => ({ recommendsSection })
);

const Recommends = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { setRecommends } = actionDispatch(useDispatch());
	const { recommendsSection } = useSelector(recommendsRetriever);

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productStatus: ProductStatus.RECOMMEND,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setRecommends(data))
			.catch((err) => console.log("Error on Recommends.tsx", err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch]);
	return (
		<Container
			productData={recommendsSection}
			sectionName="Recommend Products"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default Recommends;
