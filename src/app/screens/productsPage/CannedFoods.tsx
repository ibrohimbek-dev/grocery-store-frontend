import React, { useEffect, useState } from "react";
import { HomeComponentProps } from "../../../lib/types/common";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import Container from "./Container";
import { setCannedFoods } from "./slice";
import { retrieveCannedFoods } from "./selector";
import { useGlobals } from "../../hooks/useGlobal";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setCannedFoods: (data: Product[]) => dispatch(setCannedFoods(data)),
});

const cannedFoodRetriever = createSelector(
	retrieveCannedFoods,
	(cannedFoodsSection) => ({ cannedFoodsSection })
);

const CannedFoods = ({ onAdd, cartItems, onDeleteAll }: HomeComponentProps) => {
	const { setCannedFoods } = actionDispatch(useDispatch());
	const { cannedFoodsSection } = useSelector(cannedFoodRetriever);
	const { updateNum } = useGlobals();

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productCollection: ProductCollection.CANNED_FOODS,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setCannedFoods(data))
			.catch((err) => console.log("Error on CannedFoods.tsx", err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch, updateNum]);
	return (
		<Container
			productData={cannedFoodsSection}
			sectionName="Canned Foods"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default CannedFoods;
