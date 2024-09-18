import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const Events = () => {
	const [showAdsPanel, setShowAdsPanel] = useState(true);

	const handleCloseAdsPanel = () => {
		setShowAdsPanel(false);
	};

	setTimeout(() => {
		if (!showAdsPanel) {
			setShowAdsPanel(true);
		}
	}, 50000);

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="main-container mb-10 mt-2"
		>			
				{showAdsPanel && (
					<motion.div
						className="bg-yellow-300 overflow-hidden w-full py-2 px-4 flex justify-between items-center"
						initial={{ y: -50, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -50, opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex items-center">
							<motion.img
								src="/img/assets/ads.webp"
								alt="Ads"
								className="mr-4 h-20 w-20 object-contain"
								animate={{
									scale: [1, 1.2, 1],
									opacity: [1, 0.5, 1],
								}}
								transition={{
									duration: 2,
									ease: "easeInOut",
									repeat: Infinity,
								}}
							/>
							<div>
								<div className="font-bold">Ads</div>
								<div>Check out our latest offers!</div>
							</div>
						</div>

						<div className="flex h-auto justify-around w-full">
							<div className="w-1/4 mr-4">
								<img
									src="/gifs/gif1.gif"
									alt="Ads 1"
									className="w-full h-32 object-contain"
								/>
							</div>
							<div className="w-1/4 mr-4">
								<img
									src="/gifs/gif2.gif"
									alt="Ads 2"
									className="w-full h-32 object-contain"
								/>
							</div>
							<div className="w-1/4 mr-4">
								<img
									src="/gifs/gif3.gif"
									alt="Ads 3"
									className="w-full h-32 object-contain"
								/>
							</div>
							<div className="w-1/4 mr-4">
								<img
									src="/gifs/gif4.gif"
									alt="Ads 4"
									className="w-full h-32 object-contain"
								/>
							</div>
							<div className="w-1/4 mr-4">
								<img
									src="/gifs/gif5.gif"
									alt="Ads 5"
									className="w-full h-32 object-contain"
								/>
							</div>
							<div className="w-1/4 mr-4">
								<img
									src="/gifs/gif6.gif"
									alt="Ads 6"
									className="w-full h-32 object-contain"
								/>
							</div>
							<div className="w-1/4">
								<img
									src="/gifs/gif7.gif"
									alt="Ads 7"
									className="w-full h-32 object-contain"
								/>
							</div>
						</div>
						<div
							className="text-gray-600 hover:text-gray-800 cursor-pointer"
							onClick={handleCloseAdsPanel}
						>
							<CloseIcon sx={{ fontSize: 40 }} />
						</div>
					</motion.div>
				)}			
		</motion.div>
	);
};

export default Events;
