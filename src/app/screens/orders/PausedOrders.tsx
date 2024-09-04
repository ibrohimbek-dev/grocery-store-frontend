import { createSelector } from "@reduxjs/toolkit";
import React from "react";
import { retrievePausedOrders } from "./selector";
import { useSelector } from "react-redux";
import { useGlobals } from "../../hooks/useGlobal";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { Messages, serverApi } from "../../../lib/config";
import { OrderUpdateInput } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { Box, Button, Stack, Typography } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import {
	FaTimes,
	FaPause,
	FaPlus,
	FaRegSadCry,
	FaClipboardCheck,
	FaShoppingCart,
	FaRegFrown,
} from "react-icons/fa"; // Import necessary icons
import { NavLink } from "react-router-dom";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

// REDUX SLICE & SELECTOR:
const pausedOrdersRetriever = createSelector(
	retrievePausedOrders,
	(pausedOrders) => ({ pausedOrders })
);

interface PausedOrdersProps {
	setValue: (input: string) => void;
}

const PausedOrders = ({ setValue }: PausedOrdersProps) => {
	const { pausedOrders } = useSelector(pausedOrdersRetriever);
	const { authUser, setOrderBuilder } = useGlobals();

	// HANDLERS:
	const deleteOrderHandler = async (e: T) => {
		try {
			if (!authUser) {
				// TODO: Later uncomment this line:
				// throw new Error(Messages.LOGIN_REQUIRED)
			}

			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.DELETE,
			};

			const confirmation = window.confirm("Do you want to cancel this order?");

			if (confirmation) {
				const orderService = new OrderService();
				await orderService.updateOrder(input);
				setOrderBuilder(new Date());
			}
		} catch (error) {
			console.log("Error on deleteOrderHandler =>", error);
			sweetErrorHandling(error).then();
		}
	};

	const processOrderHandler = async (e: T) => {
		try {
			// if (!authUser) {
			// 	// TODO: Later uncomment this line:
			// 	// throw new Error(Messages.LOGIN_REQUIRED)
			// }

			// PAYMENT PROCESS...

			const orderId = e.target.value;
			const input: OrderUpdateInput = {
				orderId: orderId,
				orderStatus: OrderStatus.PROCESS,
			};

			const confirmation = window.confirm(
				"Do you want to proceed with payment?"
			);

			if (confirmation) {
				const orderService = new OrderService();
				await orderService.updateOrder(input);

				// NAVIGATE TO PROCESS ORDER:
				setValue("2");
				setOrderBuilder(new Date());
			}
		} catch (error) {
			console.log("Error on processOrderHandler =>", error);
			sweetErrorHandling(error).then();
		}
	};

	return (
		<TabPanel value="1">
			<Stack spacing={4}>
				{pausedOrders?.map((order) => (
					<Box key={order._id} className="bg-white shadow-lg rounded-lg p-4">
						<Box className="overflow-y-auto max-h-60">
							{order?.orderItems?.map((orderItem) => {
								const product = order.productData.find(
									(ele) => orderItem.productId === ele._id
								);

								const imagePath = `${serverApi}/${product?.productImages[0]}`;

								return (
									<Box key={orderItem._id} className="flex items-center mb-4">
										<img
											alt=""
											src={imagePath}
											className="w-16 h-16 rounded-lg object-cover"
										/>
										<Typography variant="body1" className="ml-2 font-semibold">
											{product?.productName}
										</Typography>

										<Box className="flex items-center ml-auto">
											<Typography className="text-lg font-medium">
												${orderItem.itemPrice}
											</Typography>
											<FaTimes className="mx-2 text-gray-500" />{" "}
											{/* Close Icon */}
											<Typography>{orderItem.itemQuantity}</Typography>
											<FaPause className="mx-2 text-gray-500" />{" "}
											{/* Pause Icon */}
											<Typography className="ml-2">
												${orderItem.itemQuantity * orderItem.itemPrice}
											</Typography>
										</Box>
									</Box>
								);
							})}
						</Box>

						<Box className="bg-gray-100 p-4 rounded-lg mt-4">
							<Box className="flex justify-between items-center">
								<Typography variant="body2">Product price</Typography>
								<Typography>
									${order.orderTotal - order.orderDelivery}
								</Typography>
							</Box>
							<Box className="flex justify-between items-center mt-2">
								<Typography variant="body2">Delivery cost</Typography>
								<Typography>${order.orderDelivery}</Typography>
							</Box>
							<Box className="flex justify-between items-center mt-2">
								<Typography variant="body2">Total</Typography>
								<Typography>${order.orderTotal}</Typography>
							</Box>

							<Box className="flex justify-between mt-4">
								<Button
									value={order._id}
									variant="contained"
									color="secondary"
									onClick={deleteOrderHandler}
								>
									Cancel
								</Button>
								<Button
									value={order._id}
									variant="contained"
									onClick={processOrderHandler}
								>
									Payment
								</Button>
							</Box>
						</Box>
					</Box>
				))}

				{(!pausedOrders || pausedOrders.length === 0) && (
					<div className="flex justify-between flex-col items-center space-y-3">
						<FaRegFrown className="w-72 h-72 text-gray-400" />
						<p className="text-2xl">There is no any paused orders!</p>
						<div className="w-44 rounded-md cursor-pointer mb-2 font-semibold flex justify-center items-center space-x-2 px-4 py-2 bg-blue-300 hover:bg-blue-500 transition-all ease-linear">
							<NavLink
								className={"flex items-center space-x-2 justify-center"}
								to={"/"}
							>
								<span>Create a order!</span>
								<FaArrowUpRightFromSquare className="text-xl text-white" />
							</NavLink>
						</div>
					</div>
				)}
			</Stack>
		</TabPanel>
	);
};

export default PausedOrders;

// TODO: Shu qismidaman
