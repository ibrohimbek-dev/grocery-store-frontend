import { createSelector } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { retrievePausedOrders, retrieveUserPayment } from "./selector";
import { useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobal";
import { T } from "../../../lib/types/common";
import {
	sweetConfirmationAlert,
	sweetErrorHandling,
	sweetErrorSmallHandling,
	sweetTopSmallInfoAlert,
} from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import { OrderUpdateInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { Button, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { FaTimes, FaRegFrown, FaCheckCircle, FaEquals } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import OrderModal from "./OrderModal";
import ProductService from "../../services/ProductService";
import { Product } from "../../../lib/types/product";
import moment from "moment";
import { motion } from "framer-motion";

// REDUX SLICE & SELECTOR:
const pausedOrdersRetriever = createSelector(
	retrievePausedOrders,
	(pausedOrders) => ({ pausedOrders })
);

const userPaymentRetriever = createSelector(
	retrieveUserPayment,
	(userPayment) => ({ userPayment })
);

interface PausedOrdersProps {
	setValue: (input: string) => void;
}

const PausedOrders = ({ setValue }: PausedOrdersProps) => {
	const { pausedOrders } = useSelector(pausedOrdersRetriever);
	const { userPayment } = useSelector(userPaymentRetriever);
	const { authUser, setOrderBuilder } = useGlobals();
	const [orderData, setOrderData] = useState<Product[] | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	// HANDLERS:
	const deleteOrderHandler = async (orderId: string) => {
		try {
			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.DELETE,
			};

		const confirmation = await sweetConfirmationAlert(
			Messages.CANCEL_ORDER,
			"Yes, cancel",
			"No, don't cancel"
		);

			if (confirmation) {
				const orderService = new OrderService();
				await orderService.updateOrderStatus(input);
				setOrderBuilder(new Date());
			}
		} catch (error) {
			sweetErrorHandling(error).then();
		}
	};

	const processOrderHandler = async (e: T) => {
		try {
			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}

			if (!userPayment) {
				throw new Error(Messages.ADD_YOUR_CARD);
			}
			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.PROCESS,
			};

			const confirmation = await sweetConfirmationAlert(
				Messages.PAYMENT_PROCCEED,
				"Yes, continue",
				"No cancel order"
			);

			if (confirmation) {
				const orderService = new OrderService();
				await orderService.updateOrderStatus(input);
				setValue("2");
				setOrderBuilder(new Date());
			}
		} catch (error) {
			sweetErrorHandling(error).then();
		}
	};

	const addItemHandler = async () => {
		sweetTopSmallInfoAlert(Messages.COMING_SOON);
	};

	const removeItemHandler = async () => {
		sweetTopSmallInfoAlert(Messages.COMING_SOON);
	};

	const handleClose = () => {
		setModalOpen(false);
	};

	const singleProductClickHandle = async (productId: string) => {
		try {
			const productService = new ProductService();
			const result = await productService.getProductById(productId);
			setOrderData(result ? [result] : null);
			setModalOpen(true);
		} catch (error) {
			sweetErrorSmallHandling(error).then();
		}
	};

	return (
		<>
			<TabPanel value="1">
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
					transition={{ duration: 0.3 }}
					className="space-y-2"
				>
					{pausedOrders?.length > 0 ? (
						pausedOrders.map((order) => {
							return (
								<div
									key={order._id}
									className="bg-white shadow-lg rounded-lg p-4"
								>
									<div className="overflow-y-auto space-y-2 max-h-60">
										{order?.orderItems?.map((orderItem) => {
											const product = order.productData.find(
												(ele) => orderItem.productId === ele._id
											);

											const imagePath = `${serverApi}/${product?.productImages[0]}`;

											return (
												<div
													key={orderItem._id}
													className="flex items-center border rounded-md"
												>
													<div
														title="Show item detail!"
														onClick={() =>
															singleProductClickHandle(orderItem.productId)
														}
														className="flex rounded-md hover:bg-gray-200 cursor-pointer ease-linear transition-all justify-center items-center p-1"
													>
														<img
															alt={product?.productName}
															src={imagePath}
															className="w-16 h-16 mr-4 rounded-lg object-cover shadow-sm"
														/>
														<Typography
															variant="body1"
															className="ml-2 font-semibold"
														>
															{product?.productName}
														</Typography>
													</div>

													<div className="flex flex-col items-center p-2 ml-auto">
														<div className="flex border items-center border-gray-300 rounded-lg p-2 ml-auto">
															<Typography className="text-lg font-medium">
																${orderItem.itemPrice.toFixed(2)}
															</Typography>
															<FaTimes className="mx-2 text-gray-500" />
															<Typography>{orderItem.itemQuantity}</Typography>
															<FaEquals className="mx-2 text-gray-500" />
															<Typography className="ml-2">
																$
																{(
																	orderItem.itemQuantity * orderItem.itemPrice
																).toFixed(2)}
															</Typography>
														</div>
														<div className="space-x-2 ml-auto flex justify-end">
															<CiSquareMinus
																className="text-2xl cursor-pointer hover:text-yellow-500"
																onClick={removeItemHandler}
															/>
															<CiSquarePlus
																className="text-2xl cursor-pointer hover:text-green-500"
																onClick={addItemHandler}
															/>
														</div>
													</div>
												</div>
											);
										})}
									</div>

									<div className="bg-gray-100 flex-col border flex p-4 rounded-lg mt-4">
										<div className="flex justify-between items-center flex-1">
											<Typography variant="body2">Product price</Typography>
											<div className="flex items-center">
												<Typography>
													{" "}
													${(order.orderTotal - order.orderDelivery).toFixed(2)}
												</Typography>
												<FaCheckCircle className="ml-2 text-red-600" />
											</div>
										</div>
										<div className="flex justify-between items-center flex-1 mt-2">
											<Typography variant="body2">Delivery cost</Typography>
											<div className="flex items-center">
												<Typography>
													${order.orderDelivery.toFixed(2)}
												</Typography>
												<FaCheckCircle className="ml-2 text-yellow-600" />
											</div>
										</div>
										<div className="flex justify-between items-center flex-1 mt-2">
											<Typography
												variant="body2"
												className="font-semibold text-lg"
											>
												Total: <span className="italic font-serif">(without delivery)</span>
											</Typography>
											<div className="flex items-center">
												<Typography className="text-lg font-bold text-green-600">
													${(order.orderTotal - order.orderDelivery).toFixed(2)}
												</Typography>
												<FaCheckCircle className="ml-2 text-green-600" />
											</div>
										</div>

										<p className="text-gray-500 text-sm mt-2">
											{moment(order.createdAt).format("YY-MM-DD HH:mm")}
										</p>

										<div className="justify-between mt-4 flex space-x-2">
											<Button
												value={order._id}
												variant="contained"
												color="secondary"
												onClick={() => deleteOrderHandler(order._id)}
												className="flex-1"
											>
												Cancel
											</Button>
											<Button
												value={order._id}
												variant="contained"
												onClick={processOrderHandler}
												className="flex-1"
											>
												Payment
											</Button>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div className="flex flex-col items-center space-y-3">
							<FaRegFrown className="w-72 h-72 text-gray-400" />
							<p className="text-2xl font-semibold text-gray-700">
								There are no paused orders!
							</p>
							<div className="w-64 rounded-md cursor-pointer mb-2 font-semibold flex justify-center items-center space-x-2 px-4 py-2 bg-blue-300 hover:bg-blue-500 transition-all ease-linear">
								<NavLink
									className={"flex items-center space-x-2 justify-center"}
									to={"/"}
								>
									<span className="text-white">Create an order!</span>
									<FaArrowUpRightFromSquare className="text-xl text-white" />
								</NavLink>
							</div>
						</div>
					)}
				</motion.div>
			</TabPanel>

			<>
				<OrderModal
					handleClose={handleClose}
					open={modalOpen}
					orderData={orderData}
				/>
			</>
		</>
	);
};

export default PausedOrders;
