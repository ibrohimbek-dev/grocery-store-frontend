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
import {
	sweetTopSmallErrorAlert,
	sweetTopSmallInfoAlert,
} from "../../../lib/sweetAlert";
import OrderService from "../../services/OrderService";
import { motion } from "framer-motion";
import ProductService from "../../services/ProductService";

interface HomeComponentProps {
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
}: HomeComponentProps) => {
	const [badgeLength, setBadgeLength] = useState<number>(0);
	const [heartBadge, setHeartBadge] = useState<number | undefined>(
		productData?.productLikes
	);
	const [cartUpdated, setCartUpdated] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState<boolean>(false);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const { authUser, setOrderBuilder, updateNum } = useGlobals();

	const userId = authUser?._id;

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

	useEffect(() => {
		const productService = new ProductService();

		if (userId) {
			productService
				.getMyProductLikes(userId)
				.then((data) => {
					const likedProduct = data?.some((like) => {
						return like.likeRefId === productData?._id;
					});

					setIsLiked(!!likedProduct);
				})
				.catch((err) => console.log("err =>", err));
		}
	}, [userId, productData, updateNum]);

	const handleLikeBtn = (productId: string) => {
		const productService = new ProductService();

		if (productId?.length > 0 && userId) {
			productService
				.likeTargetProduct(productId)
				.then((data) => {
					setHeartBadge(data?.productLikes);
					setIsLiked((prev) => !prev);
				})
				.catch((err) => console.log("Error on handleLikeBtn =>", err));
		} else if (!userId) {
			sweetTopSmallInfoAlert("To like this item, please login first!").then();
		}
	};

	return (
		<>
			<motion.div
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.8 }}
				transition={{ duration: 0.3 }}
				className="flex space-x-4 justify-between items-center py-2 px-1"
			>
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
						<Badge badgeContent={heartBadge} color="success">
							<FavoriteIcon
								sx={{
									color: isLiked ? "secondary.main" : "action.disabled",
									cursor: "pointer",
								}}
							/>
						</Badge>
					</Button>
				</Tooltip>
			</motion.div>

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
