import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import { createSelector } from "@reduxjs/toolkit";
import { retrieveFinishedOrders } from "./selector";
import { useSelector } from "react-redux";
import { FaHistory, FaRegClock, FaTimes } from "react-icons/fa";
import { RiEqualFill } from "react-icons/ri";
import { Messages, serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import {
	sweetConfirmationAlert,
	sweetErrorHandling,
	sweetErrorSmallHandling,
	sweetTopSmallSuccessAlert,
} from "../../../lib/sweetAlert";
import { NavLink } from "react-router-dom";
import moment from "moment";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import OrderModal from "./OrderModal";
import { useGlobals } from "../../hooks/useGlobal";
import OrderService from "../../services/OrderService";
import { Button } from "@mui/material";
import { motion } from "framer-motion";

// REDUX SLICE & SELECTOR:
const finishedOrdersRetriever = createSelector(
	retrieveFinishedOrders,
	(finishedOrders) => ({ finishedOrders })
);

const FinishedOrders = () => {
	const { finishedOrders } = useSelector(finishedOrdersRetriever);
	const [orderData, setOrderData] = useState<Product[] | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const { authUser, setOrderBuilder } = useGlobals();

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

	// HANDLERS:
	const deleteOrderHandler = async (orderId: string) => {
		try {
			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}

			const confirmation = await sweetConfirmationAlert(
				Messages.DELETE_HISTORY,
				"Yes, delete",
				"No, don't delete"
			);

			if (confirmation) {
				const orderService = new OrderService();
				const result = await orderService.deleteOrderHistory(orderId);
				console.log("result on deleteOrderHistory =>", result);
				setOrderBuilder(new Date());
				sweetTopSmallSuccessAlert(Messages.DELETED_SUCCESSFULLY).then();
			}
		} catch (error) {
			sweetErrorHandling(error).then();
		}
	};
	return (
		<>
			<TabPanel value="3">
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
					transition={{ duration: 0.3 }}
					className="space-y-4"
				>
					{finishedOrders?.length > 0 ? (
						finishedOrders?.map((order: Order) => (
							<div
								key={order._id}
								className="border space-y-2 rounded-lg p-4 shadow-md bg-white"
							>
								<div className="overflow-auto max-h-64">
									{order?.orderItems?.map((orderItem: OrderItem) => {
										const product = order.productData.find(
											(ele) => orderItem.productId === ele._id
										);

										const imagePath = `${serverApi}/${product?.productImages[0]}`;
										return (
											<div
												key={orderItem._id}
												className="flex items-center justify-between p-2 border-b"
											>
												<div
													onClick={() =>
														singleProductClickHandle(orderItem.productId)
													}
													className="flex border rounded-md hover:bg-gray-200 cursor-pointer ease-linear transition-all justify-center items-center p-1"
												>
													<img
														src={imagePath}
														alt={product?.productName}
														className="w-16 h-16 object-cover rounded"
													/>
													<p className="flex-1 mx-4 text-lg">
														{product?.productName}
													</p>
												</div>
												<div className="flex items-center">
													<p className="text-lg">${orderItem.itemPrice}</p>
													<FaTimes className="mx-2" />
													<p className="text-lg">{orderItem.itemQuantity}</p>
													<RiEqualFill className="mx-2" />
													<p className="text-lg">
														${orderItem.itemQuantity * orderItem.itemPrice}
													</p>
												</div>
											</div>
										);
									})}
								</div>

								<div className="mt-4">
									<div className="flex flex-col space-y-2">
										<div className="flex justify-between items-center">
											<span className="font-semibold">Product price:</span>
											<span>
												${(order.orderTotal - order.orderDelivery).toFixed(2)}
											</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="font-semibold">Delivery cost:</span>
											<span>${order.orderDelivery.toFixed(2)}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="font-semibold">
												Total:{" "}
												<span className="italic font-serif">
													(without delivery)
												</span>
											</span>
											<span>${order.orderTotal.toFixed(2)}</span>
										</div>
									</div>
								</div>

								<p className="text-gray-500 text-sm mt-2">
									{moment(order.updatedAt).format("YY-MM-DD HH:mm")}
								</p>

								<Button
									variant="contained"
									color="secondary"
									onClick={() => deleteOrderHandler(order?._id)}
								>
									Delete this order history
								</Button>
							</div>
						))
					) : (
						<div className="flex flex-col items-center space-y-3">
							<FaRegClock className="w-72 h-72 text-gray-400" />{" "}
							<p className="text-2xl font-semibold text-gray-700">
								There are no finished orders!
							</p>
							<div className="w-64 rounded-md cursor-pointer mb-2 font-semibold flex justify-center items-center space-x-2 px-4 py-2 bg-blue-300 hover:bg-blue-500 transition-all ease-linear">
								<NavLink
									className={"flex items-center space-x-2 justify-center"}
									to={"/store/orders/history"}
								>
									<span className="text-white">See Your Order History!</span>
									<FaHistory className="text-xl text-white" />{" "}
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

export default FinishedOrders;
