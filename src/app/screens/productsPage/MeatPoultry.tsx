import React, { useEffect, useState } from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { setMeatPoultry } from "./slice";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveMeatPoultry } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import Container from "./Container";
import { useGlobals } from "../../hooks/useGlobal";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setMeatPoultry: (data: Product[]) => dispatch(setMeatPoultry(data)),
});

const meatPoultryRetriever = createSelector(
	retrieveMeatPoultry,
	(meatPoultrySection) => ({ meatPoultrySection })
);

const MeatPoultry = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { setMeatPoultry } = actionDispatch(useDispatch());
  const { meatPoultrySection } = useSelector(meatPoultryRetriever);
  const { updateNum } = useGlobals();

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productCollection: ProductCollection.MEAT_AND_POULTRY,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setMeatPoultry(data))
			.catch((err) => console.log("Error on FreshProduce.tsx"));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch, updateNum]);
	return (
		<Container
			productData={meatPoultrySection}
			sectionName="Meat & Poultry Products"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default MeatPoultry;
