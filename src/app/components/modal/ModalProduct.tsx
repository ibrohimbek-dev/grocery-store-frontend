import React, { useEffect, useState } from "react";
import { Product } from "../../../lib/types/product";
import {
	Modal,
	Typography,
	IconButton,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { retrieveModalProduct } from "./selector";
import { useDispatch, useSelector } from "react-redux";
import { setModalProduct } from "./slice";
import ProductService from "../../services/ProductService";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { serverApi } from "../../../lib/config";
import CardActions from "../actions/CardActions";
import { CartItem } from "../../../lib/types/search";

interface ModalProps {
	productId: string;
	sectionName: string;
	open: boolean;
	handleClose: () => void;
	onAdd: (item: CartItem) => void;
}

// REDUX SELECTOR:
const actionDispatch = (dispatch: Dispatch) => ({
	setModalProduct: (data: Product) => dispatch(setModalProduct(data)),
});

const modalProductRetriever = createSelector(
	retrieveModalProduct,
	(modalProduct) => ({ modalProduct })
);

const ModalProduct = ({
	productId,
	sectionName,
	open,
	onAdd,
	handleClose,
}: ModalProps) => {
	const { setModalProduct } = actionDispatch(useDispatch());
	const { modalProduct } = useSelector(modalProductRetriever);
	const [images, setImages] = useState<string[] | null>(null);

	useEffect(() => {
		const productService = new ProductService();

		if (productId?.length > 0) {
			productService
				.increaseView(productId)
				.then((data) => setModalProduct(data))
				.catch((err) => console.log("Error on modalProduct =>", err));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productId]);

	useEffect(() => {
		if (modalProduct?.productImages) {
			setImages(modalProduct?.productImages);
		}
	}, [modalProduct]);

	SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

	console.log("modalProduct?.productDesc =>", modalProduct?.productDesc);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<div className="bg-white outline-none space-y-5 flex flex-col justify-between p-6 rounded-lg shadow-lg max-w-4xl mx-auto mt-20">
				<div className="flex justify-between items-center">
					<Typography id="modal-title" variant="h6" component="h2">
						{sectionName} - Product Details
					</Typography>
					<IconButton onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
				</div>

				<div className="flex flex-row w-full">
					{/* Swiper Section */}
					<div className="flex-grow w-1/2 h-full flex flex-col justify-center items-center">
						<Swiper
							className="h-64 p-1 border w-full rounded-md overflow-hidden swiper-area"
							loop={true}
							spaceBetween={10}
							navigation={true}
							modules={[FreeMode, Navigation, Thumbs]}
							centeredSlides={true}
						>
							{images &&
								images.length > 0 &&
								images.map((url, index) => (
									<SwiperSlide
										className="flex justify-center overflow-hidden items-center h-full"
										key={index}
									>
										<img
											alt=""
											className="object-contain overflow-hidden h-full w-full rounded-md"
											src={`${serverApi}/${url}`}
										/>
									</SwiperSlide>
								))}
						</Swiper>
					</div>

					{/* Accordion Section */}
					<div className="w-1/2 pl-4">
						{" "}
						{/* Added padding for spacing */}
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1-content"
								id="panel1-header"
							>
								About this product
							</AccordionSummary>
							<AccordionDetails className="overflow-auto max-h-60">
								{" "}
								{/* Allow scrolling */}
								<div>
									<h3>{modalProduct?.productName}</h3>
									<p>
										<strong>Price:</strong> ${modalProduct?.productPrice}
									</p>
									<p>
										<strong>Description:</strong>{" "}
										{modalProduct?.productDesc || "No description available."}
									</p>
									<p>
										<strong>Status:</strong> {modalProduct?.productStatus}
									</p>
									<p>
										<strong>Available Count:</strong>{" "}
										{modalProduct?.productLeftCount}
									</p>
									<p>
										<strong>Size:</strong> {modalProduct?.productSize}
									</p>
									<p>
										<strong>Views:</strong> {modalProduct?.productViews}
									</p>
									<p>
										<strong>Likes:</strong> {modalProduct?.productLikes || 0}
									</p>
								</div>
							</AccordionDetails>
						</Accordion>
					</div>
				</div>

				<Button
					variant="contained"
					color="primary"
					className="mt-4"
					onClick={handleClose}
				>
					Close
				</Button>

				<CardActions onAdd={onAdd} productData={modalProduct} />
			</div>
		</Modal>
	);
};

export default ModalProduct;

// DONE!
