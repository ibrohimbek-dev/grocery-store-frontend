import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";

import reportWebVitals from "./reportWebVitals";
import ContextProvider from "./app/context/ContextProvider";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./app/App";

// =============================================
// CSS FILES:
import "./input.css";
import { SocketProvider } from "./app/context/SocketContext";


const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ContextProvider>
				<SocketProvider>
					<Router>
						<App />
					</Router>
				</SocketProvider>
			</ContextProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();

// DONE!
