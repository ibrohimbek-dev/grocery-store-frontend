import React from "react";
import { Route, Routes } from "react-router-dom";
import FreshProduce from "./FreshProduce";
import { CardActionsProps } from "../../../lib/types/common";
import DairyProducts from "./DairyProducts";
import Recommends from "./Recommends";
import Discounts from "./Discounts";
import Ads from "./Ads";
import MeatPoultry from "./MeatPoultry";
import BakeryItems from "./BakeryItems";
import CannedFoods from "./CannedFoods";
import Beverages from "./Beverages";
import { motion } from "framer-motion";

const ProductsPage = ({ onAdd, cartItems, onDeleteAll }: CardActionsProps) => {
	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="flex  flex-col items-center"
		>
			<Routes>
				<Route
					path="/recommends"
					element={
						<Recommends
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/discounts"
					element={
						<Discounts
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/ads"
					element={
						<Ads
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/fresh-produce"
					element={
						<FreshProduce
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/dairy-products"
					element={
						<DairyProducts
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/meat-poultry"
					element={
						<MeatPoultry
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/bakery-items"
					element={
						<BakeryItems
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/canned-foods"
					element={
						<CannedFoods
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
				<Route
					path="/beverages"
					element={
						<Beverages
							cartItems={cartItems}
							onAdd={onAdd}
							onDeleteAll={onDeleteAll}
						/>
					}
				/>
			</Routes>
		</motion.div>
	);
};

export default ProductsPage;
