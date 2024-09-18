import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import { createSelector } from "@reduxjs/toolkit";
import { retieveProcessOrders } from "./selector";
import { useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobal";
import { T } from "../../../lib/types/common";
import { Messages, serverApi } from "../../../lib/config";
import { OrderUpdateInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import {
	sweetConfirmationAlert,
	sweetErrorHandling,
	sweetErrorSmallHandling,
} from "../../../lib/sweetAlert";
import { FaRegFrown, FaTimes } from "react-icons/fa";
import { RiEqualFill } from "react-icons/ri";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import OrderModal from "./OrderModal";
import { motion } from "framer-motion";

// REDUX SLICE & SELECTOR
const processOrderRetriever = createSelector(
	retieveProcessOrders,
	(processOrders) => ({ processOrders })
);

interface ProcessOrderProps {
	setValue: (input: string) => void;
}

const ProcessOrders = ({ setValue }: ProcessOrderProps) => {
	const { processOrders } = useSelector(processOrderRetriever);
	const { authUser, setOrderBuilder } = useGlobals();
	const [orderData, setOrderData] = useState<Product[] | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	// HANDLERS:
	const finishOrderHandler = async (e: T) => {
		try {
			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}
			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.FINISH,
			};

			const confirmation = await sweetConfirmationAlert(
				Messages.RECEIVED_ORDER,
				"Yes, I received it",
				"No, not yet"
			);

			if (confirmation) {
				const orderService = new OrderService();
				await orderService.updateOrderStatus(input);
				setValue("3");
				setOrderBuilder(new Date());
			}
		} catch (error) {
			console.log("Error on finishOrderHandler =>", error);
			sweetErrorHandling(error).then();
		}
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
			<TabPanel value="2">
				<motion.div
					initial={{ scale: 0.8 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0.8 }}
					transition={{ duration: 0.3 }}
					className="space-y-4"
				>
					{processOrders?.length > 0 ? (
						processOrders.map((order) => (
							<div
								key={order._id}
								className="border rounded-lg p-4 shadow-md bg-white"
							>
								<div className="overflow-auto max-h-64">
									{order?.orderItems?.map((orderItem) => {
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
													className="flex rounded-md hover:bg-gray-200 cursor-pointer ease-linear transition-all justify-center items-center p-1"
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
											<span className="font-semibold">Total:</span>
											<span>${order.orderTotal.toFixed(2)}</span>
										</div>
									</div>

									<p className="text-gray-500 text-sm mt-2">
										{moment(order.updatedAt).format("YY-MM-DD HH:mm")}
									</p>

									<button
										value={order._id}
										onClick={finishOrderHandler}
										className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
									>
										Verify to Fulfill
									</button>
								</div>
							</div>
						))
					) : (
						<div className="flex flex-col items-center space-y-3">
							<FaRegFrown className="w-72 h-72 text-gray-400" />
							<p className="text-2xl font-semibold text-gray-700">
								There are no prcess orders!
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

export default ProcessOrders;
