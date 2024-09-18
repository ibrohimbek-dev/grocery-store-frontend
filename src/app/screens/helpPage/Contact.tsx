import React from "react";
import { Button } from "@mui/material";
import { sweetTopSmallInfoAlert } from "../../../lib/sweetAlert";
import { Messages } from "../../../lib/config";
import { motion } from "framer-motion";

const HelpPage = () => {
	const handleSendMsg = () => {
		sweetTopSmallInfoAlert(Messages.COMING_SOON).then();
	};

	return (
		<motion.div
			initial={{ scale: 0.8 }}
			animate={{ scale: 1 }}
			exit={{ scale: 0.8 }}
			transition={{ duration: 0.3 }}
			className="mt-4"
		>
			<h2 className="text-lg font-bold mb-2">Contact Us</h2>
			<p className="text-gray-600 mb-4">
				Fill out the form below to send a message
			</p>
			<form className="space-y-4">
				<div>
					<label className="block text-sm font-medium">Your Name</label>
					<input
						type="text"
						name="userNick"
						placeholder="Type your name here"
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Your Email</label>
					<input
						type="email"
						name="userEmail"
						placeholder="Type your email here"
						className="mt-1 block w-full border border-gray-300 rounded-md p-2"
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Message</label>
					<textarea
						name="userMsg"
						placeholder="Your message"
						className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24"
						required
					></textarea>
				</div>
				<div className="flex justify-end">
					<Button
						type="submit"
						onClick={handleSendMsg}
						variant="contained"
						color="primary"
					>
						Send
					</Button>
				</div>
			</form>
		</motion.div>
	);
};

export default HelpPage;
