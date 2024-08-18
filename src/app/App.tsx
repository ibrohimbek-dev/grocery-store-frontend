import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./components/header/Navbar";
import useThemeMode from "./hooks/useTheme";
import { Route, Routes } from "react-router-dom";
import MainPage from "./screens/main_page";
import Footer from "./components/footer/Footer";

import "../css/main.css";
import Home from "./screens/home";
import Events from "./components/events/Events";

const App = () => {
	const theme = useThemeMode();

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="border-4  border-red-500 flex flex-col justify-between items-center">
				<>
					<div className="">
						<Events />
					</div>
					<Navbar />
				</>

				<div className="border-4 border-green-500">
					<>
						<Home />
					</>
					<Routes>
						<Route path={"/user/*"} element={<MainPage />} />
					</Routes>
				</div>

				<>
					<Footer />
				</>
			</div>
		</ThemeProvider>
	);
};

export default App;
