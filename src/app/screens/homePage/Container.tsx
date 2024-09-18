import React, { useState } from "react";
import { Product } from "../../../lib/types/product";
import { serverApi } from "../../../lib/config";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActions from "../../components/actions/CardActions";
import ModalProduct from "../../components/modal/ModalProduct";
import { CartItem } from "../../../lib/types/search";
import { NavLink } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { useGlobals } from "../../hooks/useGlobal";
import { motion } from "framer-motion";

interface ContainerProps {
	productData: Product[];
	sectionName: string;
	moreLink: string;
	onAdd: (item: CartItem) => void;
	onDeleteAll: () => void;
	cartItems: CartItem[];
}

const Container = ({
	productData,
	sectionName,
	moreLink,
	onAdd,
	onDeleteAll,
	cartItems,
}: ContainerProps) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [isProductId, setIsProductId] = useState<string>("");
	const { setUpdateNum } = useGlobals();

	const handleClose = () => {
		setModalOpen(false);
		setIsProductId("");
		setUpdateNum(0);
	};

	const setModalOpenData = (productId: string) => {
		setIsProductId(productId);
		setModalOpen(true);
		setUpdateNum(1);
	};

	return (
		<>
			<motion.div
				className="w-full"
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.8 }}
				transition={{ duration: 0.3 }}				
			>
				<div className="text-4xl font-bold mb-4">{sectionName}</div>
				<div className="grid p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
					{productData?.length > 0 ? (
						productData.map((product) => {
							const imagePath = `${serverApi}/${product.productImages[0]}`;
							return (
								<div
									onClick={() => setModalOpenData(product._id)}
									key={product._id}
									className="shadow-lg bg-white flex flex-col justify-between overflow-hidden"
								>
									<img
										src={imagePath}
										alt={product.productName}
										className="object-contain h-96 w-full p-1 hover:scale-105 ease-linear cursor-pointer transition-all"
									/>
									<div className="p-2">
										<div className="flex justify-between items-start">
											<div className="flex flex-col justify-start">
												<div className="font-semibold">
													{product.productName}
												</div>
												<div>Price: ${product.productPrice.toFixed(2)}</div>
												<div>Left Count: {product.productLeftCount}</div>
											</div>

											<div>
												<div
													className={`${
														product.productViews > 0
															? "text-black"
															: "text-gray-200"
													} flex items-center justify-center`}
												>
													{product.productViews}
													<VisibilityIcon
														sx={{ fontSize: 25, marginLeft: "5px" }}
													/>
												</div>
											</div>
										</div>
									</div>

									<>
										<CardActions
											cartItems={cartItems}
											onAdd={onAdd}
											onDeleteAll={onDeleteAll}
											productData={product}
										/>
									</>
								</div>
							);
						})
					) : (
						<div>No products are not available</div>
					)}
				</div>

				{productData?.length > 0 && (
					<div className="w-full flex justify-center items-center">
						<div className="w-32 rounded-md cursor-pointer mb-2 font-semibold flex justify-center items-center space-x-2 px-4 py-2 bg-blue-300 hover:bg-blue-500 transition-all ease-linear">
							<NavLink
								className={"flex items-center justify-center"}
								to={moreLink}
							>
								See More
								<GoArrowUpRight className="text-2xl" />
							</NavLink>
						</div>
					</div>
				)}
			</motion.div>

			<>
				<ModalProduct
					productId={isProductId}
					sectionName={sectionName}
					open={modalOpen}
					handleClose={handleClose}
					onAdd={onAdd}
					onDeleteAll={onDeleteAll}
					cartItems={cartItems}
				/>
			</>
		</>
	);
};

export default Container;
