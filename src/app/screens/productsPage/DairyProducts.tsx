import React, { useEffect, useState } from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setDiaryProducts } from "./slice";
import { retrieveDairyProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import Container from "./Container";

// REDUX SLICE & SELEVCTOR:
const actionDispatch = (dispatch: Dispatch) => ({
	setDiaryProducts: (data: Product[]) => dispatch(setDiaryProducts(data)),
});

const diaryProductsRetriever = createSelector(
	retrieveDairyProducts,
	(diaryProductsSection) => ({ diaryProductsSection })
);

const DairyProducts = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { setDiaryProducts } = actionDispatch(useDispatch());
	const { diaryProductsSection } = useSelector(diaryProductsRetriever);

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productCollection: ProductCollection.DAIRY_PRODUCTS,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setDiaryProducts(data))
			.catch((er) => console.log("Error on DairyProducts.tsx"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch]);

	console.log("diaryProductsSection => ", diaryProductsSection);
	return (
		<Container
			productData={diaryProductsSection}
			sectionName="Diary Products"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default DairyProducts;
