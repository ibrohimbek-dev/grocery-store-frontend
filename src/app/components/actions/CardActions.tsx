import React, { useEffect, useState } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Badge, Button, Tooltip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Snackbar, Alert } from "@mui/material";

import { Product } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import { T } from "../../../lib/types/common";
import { NavLink } from "react-router-dom";

interface CardActionsProps {
	productData?: Product | null;
	onAdd: (item: CartItem) => void;
}

const CardActions = ({ productData, onAdd }: CardActionsProps) => {
	const [badgeLength, setBadgeLength] = useState<number>(0);
	const [cartUpdated, setCartUpdated] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState<boolean>(false);

	const cartData: string | null = localStorage.getItem("cartData");
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
		e.stopPropagation();
		setCartUpdated((prev) => !prev);
	};

	const proceedOrderHandler = (productId: string) => {
		console.log("Order productData =>", productId);
	};

	const handleLikeBtn = (productId: string) => {
		console.log("like productId =>", productId);
	};

	return (
		<>
			<div className="flex space-x-4 justify-between items-center py-2 px-1">
				<Tooltip title="Order this item">
					<Button
						variant="contained"
						color="success"
						onClick={(e) => {
							proceedOrderHandler(productData?._id!);
							e.stopPropagation();
						}}
						aria-label="buy"
						sx={{ width: "59%" }} // Set width to 60%
					>
						<NavLink to={"/shop/orders"}>Order</NavLink>
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
