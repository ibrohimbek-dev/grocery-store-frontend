import React, { ChangeEvent, useEffect, useState } from "react";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CardActions from "../../components/actions/CardActions";
import { serverApi } from "../../../lib/config";
import ModalProduct from "../../components/modal/ModalProduct";
import { Button } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";

interface ContainerProps {
	productData: Product[];
	sectionName: string;
	onAdd: (item: CartItem) => void;
	onDeleteAll: () => void;
	cartItems: CartItem[];
	productSearch: ProductInquiry;
	setProductSearch: (search: ProductInquiry) => void;
}

const Container: React.FC<ContainerProps> = ({
	productData,
	sectionName,
	onAdd,
	onDeleteAll,
	cartItems,
	productSearch,
	setProductSearch,
}) => {
	const [searchText, setSearchText] = useState<string>("");
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [isProductId, setIsProductId] = useState<string>("");
	const { setUpdateNum } = useGlobals();

	const handleClose = () => {
		setModalOpen(false);
		setIsProductId("");
		setUpdateNum(123);
	};

	const setModalOpenData = (productId: string) => {
		setIsProductId(productId);
		setModalOpen(true);
		setUpdateNum(133);
	};

	useEffect(() => {
		if (searchText === "") {
			productSearch.search = "";
			setProductSearch({ ...productSearch });
		} else {
			const updatedSearch = { ...productSearch, search: searchText, page: 1 };
			setProductSearch(updatedSearch);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	const searchOrderHandler = (order: string) => {
		const updatedSearch = { ...productSearch, page: 1, order };
		setProductSearch(updatedSearch);
	};

	const searchProductHandler = (searchText: string) => {
		const updatedSearch = { ...productSearch, search: searchText, page: 1 }; // Reset to page 1 on new search
		setProductSearch(updatedSearch);
	};

	const paginationHandler = (e: ChangeEvent<unknown>, value: number) => {
		const updatedSearch = { ...productSearch, page: value };
		setProductSearch(updatedSearch);
	};

	const searchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			searchProductHandler(searchText);
		}
	};

	const totalPages = Math.ceil(productData.length / productSearch.limit);

	return (
		<>
			<motion.div
				className="w-full"
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.8 }}
				transition={{ duration: 0.3 }}
			>
				<div className="border-b border-gray-300 w-full flex items-center justify-between p-4 bg-white shadow-sm">
					<div className="flex space-x-2">
						<Button
							variant="contained"
							color={
								productSearch.order === "productPrice" ? "primary" : "secondary"
							}
							className="transition duration-200 transform hover:scale-105"
							onClick={() => searchOrderHandler("productPrice")}
						>
							Price
						</Button>
						<Button
							variant="contained"
							color={
								productSearch.order === "productViews" ? "primary" : "secondary"
							}
							className="transition duration-200 transform hover:scale-105"
							onClick={() => searchOrderHandler("productViews")}
						>
							Views
						</Button>
						<Button
							variant="contained"
							color={
								productSearch.order === "createdAt" ? "primary" : "secondary"
							}
							className="transition duration-200 transform hover:scale-105"
							onClick={() => searchOrderHandler("createdAt")}
						>
							New
						</Button>
					</div>

					<div className="flex items-center space-x-2">
						<input
							type="search"
							placeholder="Type here"
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							className="border w-96 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
							onKeyDown={searchKeyDown}
						/>
						<Button
							variant="contained"
							endIcon={<SearchIcon />}
							onClick={() => searchProductHandler(searchText)}
							className="bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
						>
							Search
						</Button>
					</div>
				</div>

				{/* Render product data */}
				<div className="w-full">
					<div className="text-4xl font-bold mb-4">{sectionName}</div>
					<div className="grid p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{productData.length > 0 ? (
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
														className={`flex items-center justify-center ${
															product.productViews > 0
																? "text-black"
																: "text-gray-200"
														}`}
													>
														{product.productViews}
														<VisibilityIcon
															sx={{ fontSize: 25, marginLeft: "5px" }}
														/>
													</div>
												</div>
											</div>
										</div>
										<CardActions
											cartItems={cartItems}
											onAdd={onAdd}
											onDeleteAll={onDeleteAll}
											productData={product}
										/>
									</div>
								);
							})
						) : (
							<div>No products available</div>
						)}
					</div>

					<div className="flex justify-center my-4">
						<Pagination
							count={totalPages}
							page={productSearch.page}
							renderItem={(item) => (
								<PaginationItem
									components={{
										previous: ArrowBackIcon,
										next: ArrowForwardIcon,
									}}
									{...item}
									color={"secondary"}
								/>
							)}
							onChange={paginationHandler}
						/>
					</div>
				</div>
			</motion.div>

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
	);
};

export default Container;
