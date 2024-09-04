import React from "react";
import { Route, Routes } from "react-router-dom";
import UserSignup from "./UserSignup";
import UserLogin from "./UserLogin";

const AuthenticationModal = () => {
	return (
		<div className="flex  flex-col items-center">
			<Routes>
				<Route path="/signup" element={<UserSignup />} />
				<Route path="/login" element={<UserLogin />} />
			</Routes>
		</div>
	);
};

export default AuthenticationModal;
