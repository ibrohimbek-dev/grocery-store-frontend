import React, { SyntheticEvent, useState } from "react";
import {
	Container,
	Tabs,
	Tab,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqs } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";
import Contact from "./Contact";
import { motion } from "framer-motion";

const HelpPage = () => {
	const [isValue, setIsValue] = useState("1");

	const handleChange = (e: SyntheticEvent, newValue: string) => {
		setIsValue(newValue);
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="bg-gray-100 min-h-screen py-6"
		>
			<Container>
				<div className="bg-white shadow-md rounded-lg p-4">
					<Tabs value={isValue} onChange={handleChange} aria-label="Help tabs">
						<Tab label="Terms" value="1" />
						<Tab label="FAQ" value="2" />
						<Tab label="Contact" value="3" />
					</Tabs>

					{isValue === "1" && (
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition={{ duration: 0.3 }}
							className="mt-4"
						>
							{terms.map((term, index) => (
								<p key={index} className="text-gray-700 mb-2">
									{term}
								</p>
							))}
						</motion.div>
					)}

					{isValue === "2" && (
						<motion.div
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							exit={{ scale: 0.8 }}
							transition={{ duration: 0.3 }}
							className="mt-4"
						>
							{faqs.map((faq, index) => (
								<Accordion key={index} className="mb-2">
									<AccordionSummary expandIcon={<ExpandMoreIcon />}>
										<span className="font-semibold">{faq.question}</span>
									</AccordionSummary>
									<AccordionDetails>
										<p>{faq.answer}</p>
									</AccordionDetails>
								</Accordion>
							))}
						</motion.div>
					)}

					{isValue === "3" && <Contact />}
				</div>
			</Container>
		</motion.div>
	);
};

export default HelpPage;
