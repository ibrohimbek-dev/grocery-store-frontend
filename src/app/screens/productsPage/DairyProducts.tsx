import React, { useEffect, useState } from "react";
import { HomeComponentProps } from "../../../lib/types/common";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setDairyProducts } from "./slice";
import { retrieveDairyProducts } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import Container from "./Container";
import { useGlobals } from "../../hooks/useGlobal";

// REDUX SLICE & SELECTOR:
const actionDispatch = (dispatch: Dispatch) => ({
	setDairyProducts: (data: Product[]) => dispatch(setDairyProducts(data)),
});

const dairyProductsRetriever = createSelector(
	retrieveDairyProducts,
	(dairyProductsSection) => ({ dairyProductsSection })
);

const DairyProducts = ({
	onAdd,
	cartItems,
	onDeleteAll,
}: HomeComponentProps) => {
	const { setDairyProducts } = actionDispatch(useDispatch());
	const { dairyProductsSection } = useSelector(dairyProductsRetriever);
	const { updateNum } = useGlobals();

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
			.then((data) => setDairyProducts(data))
			.catch((er) => console.log("Error on DairyProducts.tsx"));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch, updateNum]);

	return (
		<Container
			productData={dairyProductsSection}
			sectionName="Dairy Products"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default DairyProducts;
