import React from "react";
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
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { serverApi } from "../../../lib/config";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface OrderModalProps {
	orderData: Product[] | null; // Changed to an array of products
	handleClose: () => void;
	open: boolean;
}

const OrderModal = ({ orderData, open, handleClose }: OrderModalProps) => {
	SwiperCore.use([FreeMode, Navigation, Thumbs, Pagination]);

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
						<span className="font-semibold">Order Details</span>
					</Typography>
					<IconButton onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
				</div>

				{orderData?.map((product, index) => (
					<div key={product._id} className="flex flex-row w-full">
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
								{product.productImages?.map((url, imgIndex) => (
									<SwiperSlide
										className="flex justify-center overflow-hidden items-center h-full"
										key={imgIndex}
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
							<Accordion defaultExpanded>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls={`panel${index}-content`}
									id={`panel${index}-header`}
								>
									About this product
								</AccordionSummary>
								<AccordionDetails className="overflow-auto max-h-60">
									<div>
										<h3>{product.productName}</h3>
										<p>
											<strong>Price:</strong> ${product.productPrice}
										</p>
										<p>
											<strong>Description:</strong>{" "}
											{product.productDesc || "No description available."}
										</p>
										<p>
											<strong>Status:</strong> {product.productStatus}
										</p>
										<p>
											<strong>Available Count:</strong>{" "}
											{product.productLeftCount}
										</p>
										<p>
											<strong>Size:</strong> {product.productSize}
										</p>
										<p>
											<strong>Views:</strong> {product.productViews}
										</p>
										<p>
											<strong>Likes:</strong> {product.productLikes || 0}
										</p>
									</div>
								</AccordionDetails>
							</Accordion>
						</div>
					</div>
				))}

				<Button
					variant="contained"
					color="primary"
					className="mt-4"
					onClick={handleClose}
				>
					Close
				</Button>
			</div>
		</Modal>
	);
};

export default OrderModal;
