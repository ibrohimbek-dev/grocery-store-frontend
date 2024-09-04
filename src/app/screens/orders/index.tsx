import { Dispatch } from "@reduxjs/toolkit";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";
import { Messages, serverApi } from "../../../lib/config";

import { FaUserCircle } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { UserType } from "../../../lib/enums/user.enum";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { Box, Container, Stack, Tab, Tabs } from "@mui/material";
import { TabContext } from "@mui/lab";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
	FaCcVisa,
	FaCcMastercard,
	FaCcPaypal,
	FaCcDiscover,
} from "react-icons/fa";
import { sweetTopSmallErrorAlert } from "../../../lib/sweetAlert";

// REDUX SLICE & SELECTOR:
const actionDispatch = (dispatch: Dispatch) => ({
	setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
	setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
	setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

const OrdersPage = () => {
	const { setPausedOrders, setProcessOrders, setFinishedOrders } =
		actionDispatch(useDispatch());

	const { orderBuilder, authUser } = useGlobals();
	const [value, setValue] = useState("1");
	const navigate = useNavigate();
	const location = useLocation();

	if (!authUser) {
		// TODO:
		sweetTopSmallErrorAlert(Messages.LOGIN_REQUIRED).then();
		navigate("/login", { state: { from: location.pathname } });
	}

	const userImage =
		authUser?.userImage && `${serverApi}/${authUser?.userImage}`;

	const userType =
		authUser?.userType === UserType.SHOP_OWNER ? "owner" : "user";

	const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
		page: 1,
		limit: 5,
		orderStatus: OrderStatus.PAUSE,
	});

	const isActive = authUser?.userType === UserType.USER; // Example condition
	const statusIcon = isActive ? (
		<CheckCircleIcon className="text-green-500" />
	) : (
		<AccessTimeIcon className="text-yellow-500" />
	);

	useEffect(() => {
		const orderService = new OrderService();

		orderService
			.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
			.then((data) => setPausedOrders(data))
			.catch((err) =>
				console.log("Error on getMyOrders in OrdersPage (PAUSE)=>", err)
			);
		orderService
			.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
			.then((data) => setProcessOrders(data))
			.catch((err) =>
				console.log("Error on getMyOrders in OrdersPage (PROCESS)=>", err)
			);
		orderService
			.getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
			.then((data) => setFinishedOrders(data))
			.catch((err) =>
				console.log("Error on getMyOrders in OrdersPage (FINISH)=>", err)
			);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderInquiry, orderBuilder]);

	// HANDLERS:
	const handleChange = (e: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<div className="order-page bg-gray-100 min-h-screen p-4">
			<Container className="order-container mx-auto">
				<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
					<Stack className="order-left flex-1 bg-white rounded-lg shadow-lg p-4">
						<TabContext value={value}>
							<Box className="order-nav-frame mb-4">
								<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
									<Tabs
										onChange={handleChange}
										aria-label="basic tabs example"
										className="table-list"
										value={value}
									>
										<Tab label="PAUSED ORDERS" value="1" />
										<Tab label="PROCESS ORDERS" value="2" />
										<Tab label="FINISHED ORDERS" value="3" />
									</Tabs>
								</Box>
							</Box>

							<Stack className="order-main-content">
								{/* Uncomment as needed */}
								<PausedOrders setValue={setValue} />
								{/* <ProcessOrders setValue={setValue} /> */}
								<FinishedOrders />
							</Stack>
						</TabContext>
					</Stack>

					{/* Right Section */}
					<Stack className="order-right flex-1 bg-white rounded-lg shadow-lg p-4">
						<Box className="order-info-box mb-4 p-4 rounded-lg shadow">
							<Box className=" flex items-center mb-4 p-4 bg-white shadow-lg rounded-lg">
								<div className="w-full relative">
									{userImage ? (
										<img
											alt=""
											src={userImage}
											className=" rounded-full w-16 h-16 object-cover border-2 border-gray-300"
										/>
									) : (
										<FaUserCircle className="text-gray-400 w-16 h-16" />
									)}
									<div className="flex justify-between flex-col items-start w-full mt-1">
										<span className="italic text-gray-600">
											{`${authUser?.userNick} (${userType})`}
										</span>
										<div className="flex items-center mt-1">
											{statusIcon}
											<span className="ml-1 text-sm text-gray-500">
												{isActive ? "Active" : "Inactive"} for{" "}
												{authUser?.createdAt
													? authUser.createdAt.toLocaleDateString()
													: "N/A"}
											</span>
										</div>
									</div>
								</div>
								<div className="ml-4">
									<span className="order-user-name font-semibold text-lg text-gray-800">
										{authUser?.userNick}
									</span>
									<span className="order-user-name text-gray-600">
										{authUser?.userType}
									</span>
								</div>
							</Box>

							<Box className="linear mb-2 border-b border-gray-300"></Box>

							<Box className="order-user-address flex items-center">
								<LocationOnIcon className="mr-2 text-gray-600" />
								<div className="spec-address-txt text-gray-700">
									{authUser?.userAddress ? authUser?.userAddress : "No Address"}
								</div>
							</Box>
						</Box>

						<Box className="order-info-box p-4 rounded-lg shadow">
							<input
								type="text"
								name="cardNumber"
								placeholder="Card number: **** 1234 5678 9123"
								className=" border border-gray-300 rounded-lg p-2 mb-4 w-full"
								required
							/>
							<div className="flex justify-between mb-4">
								<input
									type="text"
									name="cardPeriod"
									placeholder="07 / 26"
									className="card-half-input border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
									required
								/>
								<input
									type="text"
									name="cardCVV"
									placeholder="CVV: 999"
									className="card-half-input border border-gray-300 rounded-lg p-2 w-1/2"
									required
								/>
							</div>
							<input
								type="text"
								name="cardCreator"
								placeholder="Your Full Name"
								className="card-input border border-gray-300 rounded-lg p-2 mb-4 w-full"
								required
							/>
							<div className="cards-box flex space-x-2">
								<FaCcVisa
									className="h-8 w-8 text-blue-600 cursor-pointer"
									aria-label="Visa"
								/>
								<FaCcMastercard
									className="h-8 w-8 text-red-600 cursor-pointer"
									aria-label="MasterCard"
								/>
								<FaCcPaypal
									className="h-8 w-8 text-blue-500 cursor-pointer"
									aria-label="PayPal"
								/>
								<FaCcDiscover
									className="h-8 w-8 text-orange-600 cursor-pointer"
									aria-label="Discover"
								/>
							</div>
						</Box>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
};

export default OrdersPage;

// TODO: Shu qimidaman
