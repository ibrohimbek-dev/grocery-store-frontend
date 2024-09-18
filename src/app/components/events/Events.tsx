import React, { useState, useEffect } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	IconButton,
	Box,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

const Events = () => {
	const [showAdsPanel, setShowAdsPanel] = useState<boolean>(true);
	const [expanded, setExpanded] = useState<boolean>(true);

	const handleAccordionChange = () => {
		setExpanded(!expanded);
	};

	const handleCloseAdsPanel = () => {
		setExpanded(false);
		setShowAdsPanel(false);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!showAdsPanel) {
				setShowAdsPanel(true);
				setExpanded(true);
			}
		}, 100000);

		return () => clearTimeout(timer);
	}, [showAdsPanel]);

	return (
		<Accordion
			className="w-full"
			expanded={expanded}
			onChange={handleAccordionChange}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="ads-content"
				id="ads-header"
				sx={{ backgroundColor: "#FFEB3B" }} // Yellow background
			>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					width="100%"
				>
					<Typography variant="h6" fontWeight="bold">
						Ads
					</Typography>
					<IconButton onClick={handleCloseAdsPanel}>
						<CloseIcon sx={{ fontSize: 30 }} />
					</IconButton>
				</Box>
			</AccordionSummary>

			<AccordionDetails>
				<motion.div
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					exit={{ y: -20, opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<div className="w-full flex justify-between">
						{[...Array(7)].map((_, index) => (
							<Box key={index} width="calc(14.28% - 8px)" m={1}>
								<img
									src={`/gifs/gif${index + 1}.gif`}
									alt={`Ads ${index + 1}`}
									className="w-full cursor-pointer hover:scale-105 transition-all ease-in-out h-32 object-contain"
								/>
							</Box>
						))}
					</div>
				</motion.div>
			</AccordionDetails>
		</Accordion>
	);
};

export default Events;
