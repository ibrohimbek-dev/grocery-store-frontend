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
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css";

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
					className="3xl:flex hidden h-full w-full overflow-x-hidden flex-col justify-between items-center"
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
						className="main-container 3xl:block hidden"
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

					<div className={isHome ? "relative w-full" : "hidden"}>
						<Footer />
					</div>

					<>
						<Sidebar />
					</>
				</div>

				<>
					<div className="fixed 3xl:hidden inset-0 flex items-center justify-center bg-black bg-opacity-50">
						<div className="bg-white m-4 rounded-lg p-6 shadow-lg max-w-sm w-full">
							<h2 className="text-lg font-semibold mb-4">Attention</h2>
							<p className="mb-2">
								Our team is working on a mobile and responsive version.
							</p>
							<p className="mb-4">
								Please use the desktop version for a better experience.
							</p>
							<button
								onClick={() =>
									alert(
										"To switch to desktop mode, please resize your browser window or use the 'Request Desktop Site' option in your browser settings."
									)
								}
								className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
							>
								Switch to Desktop Mode
							</button>
						</div>
					</div>
				</>
			</AnimatePresence>
		</ThemeProvider>
	);
};

export default App;
