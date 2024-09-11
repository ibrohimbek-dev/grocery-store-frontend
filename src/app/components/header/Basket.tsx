import React, { MouseEvent, useEffect, useState } from "react";
import { Badge, IconButton, Menu, Button } from "@mui/material";
// import { useGlobals } from "app/hooks/useGlobal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { BasketProps } from "../../../lib/types/common";
import { CartItem } from "../../../lib/types/search";
import { Messages, serverApi } from "../../../lib/config";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobal";
import { sweetPopupErrorHandling } from "../../../lib/sweetAlert";

const Basket = (props: BasketProps) => {
	const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = props;
	const { authUser, setOrderBuilder } = useGlobals();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const navigate = useNavigate();

	const itemPrice: number = cartItems.reduce(
		(a: number, c: CartItem): number => {
			return a + c.quantity * c.price;
		},
		0
	);

	const open = Boolean(anchorEl);
	const shippingCost = itemPrice < 100 ? 5 : 0;
	const totalPrice = (itemPrice + shippingCost).toFixed(1);

	// HANDLERS:
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const proceedOrderHandler = async () => {
		try {
			handleClose();

			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}
			const orderService = new OrderService();
			await orderService.createOrder(cartItems);

			onDeleteAll();
			setOrderBuilder(new Date());
			navigate("/store/orders");
		} catch (err) {
			console.log("Error on processOrderHandler =>", err);
			sweetPopupErrorHandling(Messages.LOGIN_REQUIRED).then();
			navigate("/store/process/login");
		}
	};

	useEffect(() => {
		if (cartItems?.length <= 0) {
			handleClose();
		}
	}, [cartItems]);

	return (
		<div className="">
			<IconButton
				aria-label="cart"
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<Badge
					className="flex flex-col items-center justify-center"
					badgeContent={cartItems?.length}
					color="secondary"
				>
					<ShoppingCartIcon sx={{ fontSize: 35 }} />
					<span className="text-base">My Cart</span>
				</Badge>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						maxHeight: "400px", // Set a maximum height
						overflowY: "auto", // Enable vertical scrolling
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<div className=" p-3 space-y-2 flex flex-col">
					<div className="">
						{cartItems?.length > 0 ? (
							<div className="items-center flex justify-between">
								<div>Cart Products</div>
								<DeleteForeverIcon
									sx={{ ml: "5px", cursor: "pointer", fontSize: "28px" }}
									color={"warning"}
									onClick={onDeleteAll}
								/>
							</div>
						) : (
							<div className="px-2">Cart is empty!</div>
						)}
					</div>

					<div className="border rounded-md flex space-y-2 flex-col p-1 justify-between">
						{cartItems.map((item: CartItem) => {
							const imagePath = `${serverApi}/${item.image}`;

							return (
								<div
									key={item._id}
									className="flex space-y-4  p-2 bg-white rounded-md flex-col justify-between"
								>
									<div className="flex flex-row justify-between">
										<div className="">
											<img alt="" src={imagePath} className="w-32" />
										</div>

										<div className="">
											<CancelIcon
												onClick={() => onDelete(item)}
												color="error"
												sx={{ cursor: "pointer" }}
											/>
										</div>
									</div>

									<div className="flex space-x-6 justify-between items-start">
										<div className="flex flex-col justify-start items-start">
											<span className="product-name">{item.name}</span>

											<p className="product-price">
												${item.price} x {item.quantity}
											</p>
										</div>
										<div className="flex justify-between items-center space-x-2">
											<button
												onClick={() => onRemove(item)}
												className="hover:bg-blue-400 transition-all ease-linear rounded-full"
											>
												<CiCircleMinus className="text-2xl" />
											</button>
											<button
												onClick={() => onAdd(item)}
												className="hover:bg-green-400 transition-all ease-linear rounded-full"
											>
												<CiCirclePlus className="text-2xl" />
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{cartItems.length > 0 ? (
						<div className=" space-y-3 flex flex-col">
							<span className="price">
								Total: ${totalPrice} ({itemPrice} + {shippingCost})
							</span>

							<Button
								onClick={proceedOrderHandler}
								startIcon={<ShoppingCartIcon />}
								variant="contained"
							>
								Order
							</Button>
						</div>
					) : (
						""
					)}
				</div>
			</Menu>
		</div>
	);
};

export default Basket;

// DONE!
