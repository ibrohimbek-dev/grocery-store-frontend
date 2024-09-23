import React, { useEffect, useState } from "react";
import { HomeComponentProps } from "../../../lib/types/common";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { setFreshProduce } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { useDispatch, useSelector } from "react-redux";
import { retrieveFreshProduce } from "./selector";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import Container from "./Container";
import { useGlobals } from "../../hooks/useGlobal";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setFreshProduce: (data: Product[]) => dispatch(setFreshProduce(data)),
});

const freshProduceRetriever = createSelector(
	retrieveFreshProduce,
	(freshProduceSection) => ({ freshProduceSection })
);

const FreshProduce = ({
	onAdd,
	cartItems,
	onDeleteAll,
}: HomeComponentProps) => {
	const { setFreshProduce } = actionDispatch(useDispatch());
	const { freshProduceSection } = useSelector(freshProduceRetriever);
	const { updateNum } = useGlobals();

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productCollection: ProductCollection.FRESH_PRODUCE,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setFreshProduce(data))
			.catch((err) => console.log("Error on FreshProduce.tsx", err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch, updateNum]);

	return (
		<Container
			productData={freshProduceSection}
			sectionName="Fresh Produce"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default FreshProduce;
