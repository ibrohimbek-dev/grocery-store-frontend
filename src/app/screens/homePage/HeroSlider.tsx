import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Swiper as SwiperCore,
	Autoplay,
	Navigation,
	Pagination,
	FreeMode,
	Thumbs,
} from "swiper";

import { motion } from "framer-motion";

import { useGlobals } from "../../hooks/useGlobal";

const HeroSlider = () => {
	const { showHero } = useGlobals();

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
			className={
				showHero
					? "hidden"
					: "flex w-screen items-center justify-center flex-col overflow-hidden rounded-md"
			}
		>
			<div className="w-full overflow-hidden my-10 h-full flex flex-col justify-center items-center">
				<Swiper
					className="h-auto w-full rounded-md overflow-hidden swiper-area"
					loop={true}
					spaceBetween={10}
					initialSlide={0}
					centeredSlides={false}
					navigation={true}
					modules={[FreeMode, Navigation, Thumbs, Autoplay]}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					speed={1500}
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
