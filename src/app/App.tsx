import React, { useEffect, useRef } from "react";
import Navbar from "./components/header/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
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

import "../css/main.css";
import "../css/app.css";
import UserPage from "./screens/user";
import Example from "./sample/Example";
const App = () => {
	const { darkMode } = useGlobals();
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
	const darkTheme = themeMode(darkMode);
	const location = useLocation();

	const isRegister =
		location.pathname === "/store/process/login" ||
		location.pathname === "/store/process/signup";

	const containerRef = useRef<HTMLDivElement | null>(null);
	const resizeTimeout = useRef<NodeJS.Timeout | null>(null); // Use useRef to persist the timeout

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			if (resizeTimeout.current) {
				clearTimeout(resizeTimeout.current);
			}
			resizeTimeout.current = setTimeout(() => {
				if (containerRef.current) {
					console.log(
						"Resize detected:",
						containerRef.current.getBoundingClientRect()
					);
				}
			}, 100);
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		// Cleanup observer on component unmount
		return () => {
			if (containerRef.current) {
				// eslint-disable-next-line react-hooks/exhaustive-deps
				resizeObserver.unobserve(containerRef.current);
			}
			if (resizeTimeout.current) {
				clearTimeout(resizeTimeout.current);
			}
		};
	}, []);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div
				ref={containerRef}
				className="border-4 h-full overflow-x-hidden  border-red-500 flex flex-col justify-between items-center"
			>
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
						<Route
							path="/"
							element={
								<HomePage
									cartItems={cartItems}
									onAdd={onAdd}
									onDeleteAll={onDeleteAll}
								/>
							}
						/>
						<Route path="*" element={<Navigate to={"/"} replace />} />
						<Route path="/store/orders" element={<OrdersPage />} />
						<Route path="/store/process/*" element={<AuthenticationModal />} />
						<Route path="/store/user-settings" element={<UserPage />} />
						<Route path="/store/example" element={<Example />} />
					</Routes>
				</div>

				<Footer />
			</div>
		</ThemeProvider>
	);
};

export default App;
