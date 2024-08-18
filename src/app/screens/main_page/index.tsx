import React from "react";
import { Route, Routes } from "react-router-dom";
import Electronics from "../electronics";

const MainPage = () => {
	return (
		<div>
			<Routes>
				<Route path={"/get/electronics"} element={<Electronics />} />
			</Routes>
		</div>
	);
};

export default MainPage;
