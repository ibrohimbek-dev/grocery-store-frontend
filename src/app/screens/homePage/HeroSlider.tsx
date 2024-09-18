import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";

const HeroSlider = () => {
	const images: string[] = [
		"/img/assets/main-1.webp",
		"/img/assets/main-2.webp",
		"/img/assets/main-3.webp",
		"/img/assets/main-4.webp",
		"/img/assets/main-5.webp",
		"/img/assets/main-6.webp",
		"/img/assets/main-7.webp",
	];

	SwiperCore.use([FreeMode, Navigation, Thumbs, Autoplay, Pagination]);

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="w-screen mb-10 product-img-carousel flex items-center justify-center flex-col space-y-4 overflow-hidden rounded-md"
		>
			<div className="w-full overflow-hidden space-y-4 h-full flex flex-col justify-center items-center">
				<Swiper
					className="h-auto w-full rounded-md overflow-hidden swiper-area"
					loop={true}
					spaceBetween={10}
					navigation={true}
					modules={[FreeMode, Navigation, Thumbs, Autoplay]}
					centeredSlides={false}
					initialSlide={0}
					// autoplay={{
					// 	delay: 5000, // Delay between slides in milliseconds
					// 	disableOnInteraction: false, // Don't disable autoplay when user interacts
					// 	pauseOnMouseEnter: true, // Pause autoplay when mouse hovers over the carousel
					// }}
					speed={1500} // Slide transition speed in milliseconds
				>
					{images?.length > 0 &&
						images?.map((url, index) => (
							<SwiperSlide
								className="overflow-hidden h-auto w-auto flex justify-center items-center"
								key={index}
							>
								<img
									key={index}
									alt=""
									className="object-contain h-auto w-auto overflow-hidden rounded-md"
									src={url}
								/>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</motion.div>
	);
};

export default HeroSlider;
