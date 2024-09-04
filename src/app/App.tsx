import React from "react";
import Navbar from "./components/header/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";

import "../css/main.css";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Events from "./components/events/Events";
import useBasket from "./hooks/useBasket";
import { useGlobals } from "./hooks/useGlobal";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeMode } from "./theme/theme";
import HomePage from "./screens/home";
import OrdersPage from "./screens/orders";
import AuthenticationModal from "./components/auth";

const App = () => {
	const { darkMode } = useGlobals();
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
	const darkTheme = themeMode(darkMode);
	const location = useLocation();

	const isRegister =
		location.pathname === "/shop/process/login" ||
		location.pathname === "/shop/process/signup";

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div className="border-4 h-full overflow-x-hidden  border-red-500 flex flex-col justify-between items-center">
				<div className={isRegister ? "hidden" : "flex"}>
					{/* TODO: Later uncomment this line */}
					{/* <div className="">
						<Events />
					</div> */}
					<Navbar
						cartItems={cartItems}
						onAdd={onAdd}
						onRemove={onRemove}
						onDelete={onDelete}
						onDeleteAll={onDeleteAll}
					/>
				</div>

				<div className="border-4 border-green-500 main-container">
					<Routes>
						<Route path="/" element={<HomePage onAdd={onAdd} />} />
						<Route path="*" element={<Navigate to={"/"} replace />} />
						<Route path="/shop/orders" element={<OrdersPage />} />
						<Route path="/shop/process/*" element={<AuthenticationModal />} />
					</Routes>
				</div>

				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default App;
