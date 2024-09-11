import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge, Button, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Snackbar, Alert } from "@mui/material";

import { Product } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import { T } from "../../../lib/types/common";
import { useNavigate } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";
import { Messages } from "../../../lib/config";
import { sweetTopSmallErrorAlert } from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";

interface CardActionsProps {
	productData?: Product | null;
	onAdd: (item: CartItem) => void;
	onDeleteAll: () => void;
	cartItems: CartItem[];
}

const CardActions = ({
	productData,
	onAdd,
	onDeleteAll,
	cartItems,
}: CardActionsProps) => {
	const [badgeLength, setBadgeLength] = useState<number>(0);
	const [cartUpdated, setCartUpdated] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const { authUser, setOrderBuilder } = useGlobals();

	const navigate = useNavigate();

	const cartData: string | CartItem[] | null = localStorage.getItem("cartData");
	useEffect(() => {
		if (cartData) {
			const parsedCartData: CartItem[] = JSON.parse(cartData);

			const matchingItem = parsedCartData.find(
				(item: CartItem) => item._id === productData?._id
			);

			if (matchingItem) {
				if (matchingItem.quantity < productData?.productLeftCount!) {
					setBadgeLength(matchingItem.quantity);
				} else {
					setBadgeLength(productData?.productLeftCount!);
				}
			} else {
				setBadgeLength(0);
			}
		} else {
			console.log("No cart data found.");
			setBadgeLength(0);
		}
	}, [productData, cartUpdated, cartData]); // Depend on cartUpdated

	const handleAddToCart = (e: T) => {
		e.stopPropagation();
		if (productData?._id) {
			onAdd({
				_id: productData._id,
				quantity: 1,
				name: productData.productName,
				price: productData.productPrice,
				image: productData.productImages[0],
			});
			setOpenAlert(true);

			setTimeout(() => {
				setOpenAlert(false);
			}, 3000);
		}

		setCartUpdated((prev) => !prev);
	};

	const proceedOrderHandler = async (e: T) => {
		try {
			e.stopPropagation();
			if (!authUser) {
				throw new Error(Messages.LOGIN_REQUIRED);
			}

			if (cartItems.length) {
				const orderService = new OrderService();
				await orderService.createOrder(cartItems);

				onDeleteAll();
				setOrderBuilder(new Date());
				navigate("/store/orders");
			} else {
				throw new Error(Messages.CART_EMPTY);
			}
		} catch (err: any) {
			sweetTopSmallErrorAlert(err.message);
		}
	};

	const handleLikeBtn = (productId: string) => {
		console.log("like productId =>", productId);
	};

	return (
		<>
			<div className="flex space-x-4 justify-between items-center py-2 px-1">
				<Tooltip title={authUser ? "Order this item" : "Please login first!"}>
					<Button
						variant="contained"
						color="success"
						onClick={proceedOrderHandler}
						aria-label="buy"
						sx={{ width: "59%" }} // Set width to 60%
					>
						Order
					</Button>
				</Tooltip>

				<Tooltip title="Add to cart this item">
					<Button
						variant="outlined"
						color="primary"
						onClick={handleAddToCart}
						aria-label="cart"
						sx={{ width: "24%", marginLeft: "6px" }} // Set width to 25%
					>
						<Badge badgeContent={badgeLength} color="success">
							<AddShoppingCartIcon />
						</Badge>
					</Button>
				</Tooltip>

				<Tooltip title="Add to favorites this item">
					<Button
						variant="outlined"
						color="secondary"
						onClick={(e) => {
							handleLikeBtn(productData?._id!);
							e.stopPropagation();
						}}
						aria-label="Add to favorites"
						sx={{ width: "15%" }} // Set width to 15%
					>
						<Badge badgeContent={productData?.productLikes} color="success">
							<FavoriteIcon
								sx={{
									color:
										productData?.productLikes! > 0
											? "secondary.main"
											: "action.disabled",
								}}
							/>
						</Badge>
					</Button>
				</Tooltip>
			</div>

			<Snackbar
				open={openAlert}
				autoHideDuration={3000} // Auto hide after 3 seconds
				anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning
			>
				<Alert severity="success">Item added to cart!</Alert>
			</Snackbar>
		</>
	);
};

export default CardActions;

// DONE!
// TODO: Bu qisimda "Order" bosilganda, bosilan order'ni pausedOrders'ga olib o'tishim kerak
