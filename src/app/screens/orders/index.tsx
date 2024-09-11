import { Dispatch } from "@reduxjs/toolkit";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { useGlobals } from "../../hooks/useGlobal";
import { Messages, serverApi } from "../../../lib/config";

import {
	FaCheckCircle,
	FaExclamationCircle,
	FaUserCircle,
} from "react-icons/fa";
import { UserType } from "../../../lib/enums/user.enum";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { Box, Button, Container, Stack, Tab, Tabs } from "@mui/material";
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
import {
	sweetPopupErrorHandling,
	sweetTopSmallErrorAlert,
	sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";

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
	const [selectedCard, setSelectedCard] = useState<string>("MasterCard");
	const [validationStatus, setValidationStatus] = useState<string | null>(null);
	const [card, setCard] = useState<boolean>(false);

	const handleCardChange = (event: T) => {
		setSelectedCard(event.target.value);
	};

	if (!authUser) {
		sweetPopupErrorHandling(Messages.LOGIN_REQUIRED).then();
		window.location.href = "/store/process/login";
	}

	const userImage =
		authUser?.userImage && `${serverApi}/${authUser?.userImage}`;

	const userType =
		authUser?.userType === UserType.SHOP_OWNER
			? "owner"
			: UserType.USER
			? "user"
			: "unauthenticated";

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

	const cardValidation = () => {
		const inputElements = document.querySelectorAll(".input-box");

		// Check if we have the expected number of inputs
		if (inputElements.length < 4) {
			throw new Error(Messages.SOMETHING_WENT_WRONG);
		}

		// Get values from input fields with type assertion
		const cardNumber = (inputElements[0] as HTMLInputElement).value.trim();
		const cardPeriod = (inputElements[1] as HTMLInputElement).value.trim();
		const cardCVV = (inputElements[2] as HTMLInputElement).value.trim();
		const cardCreator = (inputElements[3] as HTMLInputElement).value.trim();

		// Regular expressions for validation
		const cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/; // Format: **** **** **** ****
		const cardPeriodPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format: MM/YY
		const cardCVVPattern = /^\d{3}$/; // Format: 3 digits

		// Validate selected card
		if (!selectedCard) {
			throw new Error(Messages.CARD_TYPE_REQUIRED);
		}

		// Validate card number
		if (!cardNumberPattern.test(cardNumber)) {
			throw new Error(Messages.INVALID_CARD_NUMBER);
		}

		// Validate card period
		if (!cardPeriodPattern.test(cardPeriod)) {
			throw new Error(Messages.INVALID_EXP_DATE);
		}

		// Validate CVV
		if (!cardCVVPattern.test(cardCVV)) {
			throw new Error(Messages.INVALID_CVV);
		}

		// Validate cardholder name
		if (cardCreator.length === 0) {
			throw new Error(Messages.CARD_HOLDER_EMPTY);
		}

		console.log("All inputs are valid!");
		return true;
	};

	const validateCardClick = () => {
		try {
			if (cardValidation()) {
				setCard(true);
				setValidationStatus("success");
				sweetTopSuccessAlert(Messages.CARD_VALIDATED).then();
			}
		} catch (error: any) {
			setValidationStatus("error");
			sweetTopSmallErrorAlert(error.message).then();
		}
	};

	const renderValidationIcon = () => {
		if (validationStatus === "success") {
			return <FaCheckCircle className="h-8 w-8 text-green-600" />;
		} else if (validationStatus === "error") {
			return <FaExclamationCircle className="h-8 w-8 text-red-600" />;
		}
	};

	return (
		<div className="order-page bg-gray-100 min-h-screen p-4">
			<Container className="order-container mx-auto">
				<Stack direction={{ xs: "column", md: "row" }} spacing={2}>
					<Stack className="order-left flex-1 bg-white rounded-lg shadow-lg p-4">
						<TabContext value={value}>
							<div className="order-nav-frame mb-4">
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
							</div>

							<Stack className="order-main-content">
								<PausedOrders card={card} setValue={setValue} />
								<ProcessOrders setValue={setValue} />
								<FinishedOrders />
							</Stack>
						</TabContext>
					</Stack>

					{/* Right Section */}
					<Stack className="order-right flex-1 bg-white rounded-lg shadow-lg p-4 h-full">
						<div className="order-info-box mb-4 p-4 rounded-lg shadow">
							<div className="flex items-end mb-4 p-4 bg-white shadow-lg rounded-lg">
								<div className="w-full relative flex flex-col">
									<div className="flex">
										{userImage ? (
											<img
												alt=""
												src={userImage}
												className="rounded-full w-16 h-16 object-cover border-2 border-gray-300"
											/>
										) : (
											<FaUserCircle className="text-gray-400 w-16 h-16" />
										)}
										<NavLink to="/store/user-settings">
											<CiSettings className="text-xl cursor-pointer hover:scale-110 ease-linear transition-all" />
										</NavLink>
									</div>
									<div className="flex justify-between flex-col items-start w-full mt-1">
										<div className="flex items-center mt-1">
											{statusIcon}
											<span className="ml-1 text-sm text-gray-500">
												{isActive ? "Active" : "Inactive"} for{" "}
												{authUser?.createdAt
													? new Date(authUser.createdAt).toLocaleDateString()
													: "N/A"}
											</span>
										</div>
									</div>
								</div>
								<div className="ml-4 space-x-1">
									<span className="order-user-name font-semibold text-lg text-gray-800">
										{authUser?.userNick}
									</span>
									<span className="order-user-name font-sans italic text-gray-600">
										({userType})
									</span>
								</div>
							</div>

							<div className="linear mb-2 border-b border-gray-300"></div>

							<div className="order-user-address flex items-center">
								<LocationOnIcon className="mr-2 text-gray-600" />
								<div className="spec-address-txt text-gray-700">
									{authUser?.userAddress ? authUser?.userAddress : "No Address"}
								</div>
							</div>
						</div>

						<div className="order-info-box space-y-2 flex-col p-4 rounded-lg shadow flex-grow">
							<div className="relative flex space-x-2">
								<select
									required
									value={selectedCard}
									onChange={handleCardChange}
									className="block cursor-pointer appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
								>
									<option value="MasterCard">MasterCard</option>
									<option value="Visa">Visa</option>

									<option value="PayPal">PayPal</option>
									<option value="Discover">Discover</option>
								</select>
								<div className="absolute inset-y-0 right-0 flex items-center justify-center px-2 text-gray-700 pointer-events-none">
									<svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
										<path d="M5.5 7l4.5 4.5L14.5 7z" />
									</svg>
								</div>

								{/* Display selected card icon */}
								<div className="mt-2 flex">
									{selectedCard === "Visa" && (
										<FaCcVisa className="h-8 w-8 text-blue-600" />
									)}
									{selectedCard === "MasterCard" && (
										<FaCcMastercard className="h-8 w-8 text-red-600" />
									)}
									{selectedCard === "PayPal" && (
										<FaCcPaypal className="h-8 w-8 text-blue-500" />
									)}
									{selectedCard === "Discover" && (
										<FaCcDiscover className="h-8 w-8 text-orange-600" />
									)}
								</div>
							</div>
							<input
								type="text"
								name="cardNumber"
								placeholder="Card number: **** 1234 5678 9123"
								className="input-box border border-gray-300 rounded-lg p-2 mb-4 w-full"
								required
							/>
							<div className="flex justify-between mb-4">
								<input
									type="text"
									name="cardPeriod"
									placeholder="07 / 26"
									className="input-box card-half-input border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
									required
								/>
								<input
									type="text"
									name="cardCVV"
									placeholder="CVV: 999"
									className="input-box border border-gray-300 rounded-lg p-2 w-1/2"
									required
								/>
							</div>
							<input
								type="text"
								name="cardCreator"
								placeholder="Your Full Name"
								className="input-box border border-gray-300 rounded-lg p-2 mb-4 w-full"
								required
							/>
							<Button
								type="submit"
								onClick={validateCardClick}
								color="primary"
								variant="contained"
							>
								Validate Your Card
							</Button>

							<div className="mt-4 flex justify-center">
								{renderValidationIcon()}
							</div>
						</div>
					</Stack>
				</Stack>
			</Container>
		</div>
	);
};

export default OrdersPage;

// TODO: Shu qimidaman
