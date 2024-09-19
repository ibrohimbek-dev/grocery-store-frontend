import React, { useEffect, useState } from "react";
import { CardActionsProps } from "../../../lib/types/common";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ProductService from "../../services/ProductService";
import { ProductStatus } from "../../../lib/enums/product.enum";
import Container from "./Container";
import { setAds } from "./slice";
import { retrieveAds } from "./selector";
import { useGlobals } from "../../hooks/useGlobal";

// REDUX SLICE & SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setAds: (data: Product[]) => dispatch(setAds(data)),
});

const adsRetriever = createSelector(retrieveAds, (adsSection) => ({
	adsSection,
}));

const Ads = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	const { setAds } = actionDispatch(useDispatch());
  const { adsSection } = useSelector(adsRetriever);
  const { updateNum } = useGlobals();

	const [productSearch, setProductSearch] = useState<ProductInquiry>({
		page: 1,
		limit: 7,
		order: "createdAt",
		productStatus: ProductStatus.ADS,
		search: "",
	});

	useEffect(() => {
		const productService = new ProductService();

		productService
			.getProductsBySort(productSearch)
			.then((data) => setAds(data))
			.catch((err) => console.log("Error on Ads.tsx", err));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productSearch, updateNum]);
	return (
		<Container
			productData={adsSection}
			sectionName="Advertisement Products"
			onAdd={onAdd}
			onDeleteAll={onDeleteAll}
			cartItems={cartItems}
			productSearch={productSearch}
			setProductSearch={setProductSearch}
		/>
	);
};

export default Ads;
