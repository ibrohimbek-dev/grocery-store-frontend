import React, { useEffect, useRef } from "react";
import Navbar from "./components/header/Navbar";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Events from "./components/events/Events";
import useBasket from "./hooks/useBasket";
import { useGlobals } from "./hooks/useGlobal";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { themeMode } from "./theme/theme";
import HomePage from "./screens/homePage";
import OrdersPage from "./screens/ordersPage";
import AuthenticationModal from "./components/auth";

import UserPage from "./screens/usersPage";
import ProductsPage from "./screens/productsPage";
import { AnimatePresence } from "framer-motion";
import ActiveUsers from "./screens/usersPage/ActiveUsers";
import HelpPage from "./screens/helpPage";
import Sidebar from "./components/sidebar/Sidebar";
import { motion } from "framer-motion";

import "../css/main.css";
import "../css/app.css";

const App = () => {
	const { darkMode } = useGlobals();
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
	const darkTheme = themeMode(darkMode);
	const location = useLocation();

	const isRegister =
		location.pathname === "/store/process/login" ||
		location.pathname === "/store/process/signup";

	const isHome = location.pathname === "/";

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
			<AnimatePresence>
				<div
					ref={containerRef}
					className="h-full w-full overflow-x-hidden flex flex-col justify-between items-center"
				>
					<div
						className={
							isRegister
								? "hidden"
								: "flex space-y-2 flex-col mx-auto w-full justify-center items-center"
						}
					>
						<div className={isHome ? "flex relative w-full" : "hidden"}>
							<Events />
						</div>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ duration: 0.5, ease: "easeInOut" }}
						>
							<Navbar
								cartItems={cartItems}
								onAdd={onAdd}
								onRemove={onRemove}
								onDelete={onDelete}
								onDeleteAll={onDeleteAll}
							/>
						</motion.div>
					</div>

					<motion.div
						className="main-container"
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.5, ease: "easeInOut" }}
					>
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
							<Route
								path="/store/users/active-users"
								element={<ActiveUsers />}
							/>
							<Route path="/store/orders/history" element={<OrdersPage />} />
							<Route
								path="/store/process/*"
								element={<AuthenticationModal />}
							/>
							<Route path="/store/user-settings" element={<UserPage />} />
							<Route path="/store/help-page" element={<HelpPage />} />
							<Route
								path="/store/products/*"
								element={
									<ProductsPage
										cartItems={cartItems}
										onAdd={onAdd}
										onDeleteAll={onDeleteAll}
									/>
								}
							/>
						</Routes>
					</motion.div>

					<Footer />

					<>
						<Sidebar />
					</>
				</div>
			</AnimatePresence>
		</ThemeProvider>
	);
};

export default App;
