import React, { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { User } from "../../../lib/types/user";
import {
	Modal,
	Typography,
	IconButton,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { serverApi } from "../../../lib/config";
import { motion } from "framer-motion";

interface ModalProps {
	userId: string;
	open: boolean;
	handleClose: () => void;
}

const ModalUser = ({ userId, open, handleClose }: ModalProps) => {
	const [userModalData, setUserModalData] = useState<User | null>(null);

	useEffect(() => {
		const userService = new UserService();

		if (userId?.length > 0) {
			userService
				.increaseUserView(userId)
				.then((data) => setUserModalData(data))
				.catch((err) => console.log("Error on modalUser =>", err));
		}
	}, [userId]);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description"
		>
			<motion.div
				className="bg-white outline-none space-y-2 flex flex-col justify-between p-4 rounded-lg shadow-lg max-w-2xl mx-auto mt-20"
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				exit={{ scale: 0.8 }}
				transition={{ duration: 0.3 }}
				layout
			>
				<div className="flex justify-between items-center">
					<Typography id="modal-title" variant="h6" component="h2">
						{userModalData?.userNick} - Details
					</Typography>
					<IconButton onClick={handleClose} aria-label="close">
						<CloseIcon />
					</IconButton>
				</div>

				<div className="flex flex-row items-start justify-between">
					{/* User Image Section */}
					<div className="h-full flex justify-center items-center w-full rounded-md overflow-hidden">
						<img
							className="object-contain max-h-60 w-auto cursor-pointer hover:scale-105 transition-all ease-linear  overflow-hidden rounded-md"
							src={
								userModalData?.userImage
									? `${serverApi}/${userModalData?.userImage}`
									: "/icons/default-user.svg"
							}
							alt={userModalData?.userNick}
						/>
					</div>

					{/* Accordion Section */}
					<div className="flex flex-row w-full">
						<Accordion defaultExpanded>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1-content"
								id="panel1-header"
							>
								<span className="font-semibold text-lg">About this user</span>
							</AccordionSummary>
							<AccordionDetails className="overflow-auto max-h-60">
								{" "}
								{/* Allow scrolling */}
								<div>
									<p>
										<strong>User Name:</strong> {userModalData?.userNick}
									</p>
									<p>
										<strong>Description:</strong>{" "}
										{userModalData?.userDesc || "No description available."}
									</p>
									<p>
										<strong>Status:</strong> {userModalData?.userStatus}
									</p>
									<p>
										<strong>User Type:</strong> {userModalData?.userType}
									</p>
									<p>
										<strong>User Address:</strong>{" "}
										{userModalData?.userAddress || "No adress available."}
									</p>
									<p>
										<strong>User Phone:</strong> {userModalData?.userPhone}
									</p>
									<p>
										<strong>User Points:</strong> {userModalData?.userPoints}
									</p>
									<p>
										<strong>Views:</strong> {userModalData?.userViews}
									</p>
									<p>
										<strong>Likes:</strong> {userModalData?.userLikes || 0}
									</p>
								</div>
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
			</motion.div>
		</Modal>
	);
};

export default ModalUser;
