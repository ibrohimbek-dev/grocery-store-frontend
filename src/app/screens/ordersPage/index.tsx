import { Dispatch, createSelector } from "@reduxjs/toolkit";
import React, { useState, useEffect, SyntheticEvent } from "react";
import {
	setFinishedOrders,
	setPausedOrders,
	setProcessOrders,
	setUserPayment,
} from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch, useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobal";
import { Messages, serverApi } from "../../../lib/config";

import {
	FaCcDiscover,
	FaCcMastercard,
	FaCcPaypal,
	FaCcVisa,
	FaCheckCircle,
	FaExclamationCircle,
	FaUserCircle,
} from "react-icons/fa";
import { UserPaymentCard, UserType } from "../../../lib/enums/user.enum";
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
	sweetErrorSmallHandling,
	sweetPopupErrorHandling,
	sweetTopSmallInfoAlert,
	sweetTopSuccessAlert,
} from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";
import { CiSettings } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import UserService from "../../services/UserService";
import { UserPaymentInput } from "../../../lib/types/user";
import { retrieveUserPayment } from "./selector";
import { motion } from "framer-motion";

// REDUX SLICE & SELECTOR:
const actionDispatch = (dispatch: Dispatch) => ({
	setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
	setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
	setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
	setUserPayment: (data: UserPaymentInput) => dispatch(setUserPayment(data)),
});

const userPaymentRetriever = createSelector(
	retrieveUserPayment,
	(userPayment) => ({ userPayment })
);

const OrdersPage = () => {
	const {
		setPausedOrders,
		setProcessOrders,
		setFinishedOrders,
		setUserPayment,
	} = actionDispatch(useDispatch());

	const { userPayment } = useSelector(userPaymentRetriever);

	const { orderBuilder, authUser, setUpdateNum, updateNum } = useGlobals();
	const [value, setValue] = useState("1");
	const [selectedCard, setSelectedCard] = useState<UserPaymentCard>(
		UserPaymentCard.DISCOVER
	);
	const [cardNumber, setCardNumber] = useState("");
	const [expirationDate, setExpirationDate] = useState("");
	const [cvv, setCvv] = useState("");
	const [cardholderName, setCardholderName] = useState("");

	const handleCardChange = (event: T) => {
		setSelectedCard(event.target.value);
	};

	const validateCardClick = async (event: T) => {
		event.preventDefault();
		try {
			const userId = authUser?._id;
			if (!userId) {
				throw new Error("User ID is required.");
			}
			const input: UserPaymentInput = {
				userId,
				cardNumber,
				expirationDate,
				cvv,
				cardholderName,
				cardType: selectedCard,
			};

			if (cardValidation(input)) {
				setUpdateNum(11);
				const userService = new UserService();
				await userService.userRegisterPaymentData(input);
				sweetTopSuccessAlert(Messages.CARD_VALIDATED).then();
			}
		} catch (error) {
			console.log("error =>", error);
			sweetErrorSmallHandling(error).then();
		}
	};
	console.log("User Payment =>", userPayment);

	if (!authUser) {
		sweetPopupErrorHandling(Messages.LOGIN_REQUIRED).then();
		window.location.href = "/store/process/login";
	}

	const cardValidation = (input: UserPaymentInput) => {
		const { cardNumber, expirationDate, cvv, cardholderName } = input;

		// Regular expressions for validation
		const cardNumberPattern = /^(\d{4} ?){3}\d{4}$/; // Format: **** **** **** ****
		const cardPeriodPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // Format: MM/YY
		const cardCVVPattern = /^\d{3}$/; // Format: 3 digits

		// Validate card number
		if (!cardNumberPattern.test(cardNumber)) {
			throw new Error(Messages.INVALID_CARD_NUMBER);
		}

		// Validate expiration date
		if (!cardPeriodPattern.test(expirationDate)) {
			throw new Error(Messages.INVALID_EXP_DATE);
		}

		// Validate CVV
		if (!cardCVVPattern.test(cvv)) {
			throw new Error(Messages.INVALID_CVV);
		}

		// Validate cardholder name
		if (!cardholderName) {
			throw new Error(Messages.CARD_HOLDER_EMPTY);
		}

		return true;
	};

	const userImage =
		authUser?.userImage && `${serverApi}/${authUser?.userImage}`;

	const userType =
		authUser?.userType === UserType.STORE_OWNER
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

	useEffect(() => {
		if (authUser) {
			const userService = new UserService();
			userService
				.getUserPaymentDataById(authUser?._id)
				.then((data) => setUserPayment(data))
				.catch((err) =>
					console.log(
						"Error on getUserPaymentDataById in OrdersPage (PAYMENT)=>",
						err
					)
				);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updateNum]);

	// HANDLERS:
	const handleChange = (e: SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	const renderValidationIcon = () => {
		if (userPayment) {
			return <FaCheckCircle className="h-8 w-8 text-green-600" />;
		} else {
			return <FaExclamationCircle className="h-8 w-8 text-red-600" />;
		}
	};

	const updateUserPayment = async () => {
		setUpdateNum(1);
		sweetTopSmallInfoAlert(Messages.COMING_SOON).then();
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="order-page bg-gray-100 min-h-screen p-4"
		>
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
								<PausedOrders setValue={setValue} />
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
							<form className="space-y-2">
								<div className="relative flex space-x-2">
									<select
										disabled={userPayment ? true : false}
										required
										value={userPayment?.cardType || selectedCard} // Set the value based on userPayment or selectedCard
										onChange={handleCardChange}
										className="block cursor-pointer appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
									>
										<option value="MASTER CARD">MasterCard</option>
										<option value="VISA">Visa</option>
										<option value="PAYPAL">PayPal</option>
										<option value="DISCOVER">Discover</option>
									</select>
									<div className="absolute inset-y-0 right-0 flex items-center justify-center px-2 text-gray-700 pointer-events-none">
										<svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
											<path d="M5.5 7l4.5 4.5L14.5 7z" />
										</svg>
									</div>

									{/* Display selected card icon */}
									<div className="mt-2 flex">
										{userPayment?.cardType === UserPaymentCard.VISA && (
											<FaCcVisa className="h-8 w-8 text-blue-600" />
										)}
										{userPayment?.cardType === UserPaymentCard.MASTER_CARD && (
											<FaCcMastercard className="h-8 w-8 text-red-600" />
										)}
										{userPayment?.cardType === UserPaymentCard.PAYPAL && (
											<FaCcPaypal className="h-8 w-8 text-blue-500" />
										)}
										{userPayment?.cardType === UserPaymentCard.DISCOVER && (
											<FaCcDiscover className="h-8 w-8 text-orange-600" />
										)}
									</div>
								</div>
								<input
									disabled={userPayment ? true : false}
									type="text"
									name="cardNumber"
									placeholder="Card number: **** 1234 5678 9123"
									className="input-box border border-gray-300 rounded-lg p-2 mb-4 w-full"
									required
									value={cardNumber || userPayment?.cardNumber}
									onChange={(e) => setCardNumber(e.target.value)}
								/>
								<div className="flex justify-between mb-4">
									<input
										disabled={userPayment ? true : false}
										type="text"
										name="cardPeriod"
										placeholder="MM/YY"
										className="input-box card-half-input border border-gray-300 rounded-lg p-2 w-1/2 mr-2"
										required
										value={expirationDate || userPayment?.expirationDate}
										onChange={(e) => setExpirationDate(e.target.value)}
									/>
									<input
										disabled={userPayment ? true : false}
										type="text"
										name="cardCVV"
										placeholder="CVV: 999"
										className="input-box border border-gray-300 rounded-lg p-2 w-1/2"
										required
										value={cvv || userPayment?.cvv}
										onChange={(e) => setCvv(e.target.value)}
									/>
								</div>
								<input
									disabled={userPayment ? true : false}
									type="text"
									name="cardCreator"
									placeholder="Your Full Name"
									className="input-box border border-gray-300 rounded-lg p-2 mb-4 w-full"
									required
									value={cardholderName || userPayment?.cardholderName}
									onChange={(e) => setCardholderName(e.target.value)}
								/>
								{userPayment ? (
									<Button
										onClick={updateUserPayment}
										color="primary"
										variant="contained"
									>
										Update Your Card Info
									</Button>
								) : (
									<Button
										onClick={validateCardClick}
										color="primary"
										variant="contained"
									>
										Validate Your Card
									</Button>
								)}

								<div className="mt-4 flex justify-center">
									{renderValidationIcon()}
								</div>
							</form>
						</div>
					</Stack>
				</Stack>
			</Container>
		</motion.div>
	);
};

export default OrdersPage;
