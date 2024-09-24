import React, { ChangeEvent, useEffect, useState } from "react";
import { useGlobals } from "../../hooks/useGlobal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { serverApi } from "../../../lib/config";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import {  Button } from "@mui/material";

import { User, UserInquiry } from "../../../lib/types/user";
import ModalUser from "./ModalUser";
import { UserType } from "../../../lib/enums/user.enum";
import UserCardActions from "./UserCardActions";

interface ContainerProps {
	userData: User[];
	userSearch: UserInquiry;
	setUserSearch: (search: UserInquiry) => void;
}

const Container: React.FC<ContainerProps> = ({
	userData,
	userSearch,
	setUserSearch,
}) => {
	const [searchText, setSearchText] = useState<string>("");
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [isUserId, setIsUserId] = useState<string>("");

	

	const { setUpdateNum } = useGlobals();
	

	const handleClose = () => {
		setModalOpen(false);
		setIsUserId("");
		setUpdateNum(12);
	};

	const setModalOpenData = (userId: string) => {
		setIsUserId(userId);
		setModalOpen(true);
		setUpdateNum(13);
	};

	useEffect(() => {
		if (searchText === "") {
			userSearch.search = "";
			setUserSearch({ ...userSearch });
		} else {
			const updatedSearch = { ...userSearch, search: searchText, page: 1 };
			setUserSearch(updatedSearch);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	const searchOrderHandler = (order: string) => {
		const updatedSearch = { ...userSearch, page: 1, order };
		setUserSearch(updatedSearch);
	};

	const searchUserHandler = (searchText: string) => {
		const updatedSearch = { ...userSearch, search: searchText, page: 1 }; // Reset to page 1 on new search
		setUserSearch(updatedSearch);
	};

	const paginationHandler = (e: ChangeEvent<unknown>, value: number) => {
		const updatedSearch = { ...userSearch, page: value };
		setUserSearch(updatedSearch);
	};

	const searchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			searchUserHandler(searchText);
		}
	};

	const totalPages = Math.ceil(userData.length / userSearch.limit);

	// useEffect(() => {
	// 	if (userData && userData.length > 0) {
	// 		const totalLikes = userData.reduce((sum, user) => {
	// 			return sum + user.userLikes;
	// 		}, 0);
	// 		setHeartBadge(totalLikes);
	// 	} else {
	// 		setHeartBadge(0);
	// 	}
	// }, [userData]);

	
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
							color={userSearch.order === "createdAt" ? "primary" : "secondary"}
							className="transition duration-200 transform hover:scale-105"
							onClick={() => searchOrderHandler("createdAt")}
						>
							New
						</Button>
						<Button
							variant="contained"
							color={
								userSearch.order === "userPoints" ? "primary" : "secondary"
							}
							className="transition duration-200 transform hover:scale-105"
							onClick={() => searchOrderHandler("userPoints")}
						>
							Points
						</Button>
						<Button
							variant="contained"
							color={userSearch.order === "userViews" ? "primary" : "secondary"}
							className="transition duration-200 transform hover:scale-105"
							onClick={() => searchOrderHandler("userViews")}
						>
							Views
						</Button>
						<Button
							variant="contained"
							color={userSearch.order === "userLikes" ? "primary" : "secondary"}
							className="transition duration-200 transform hover:scale-105"
							onClick={() => searchOrderHandler("userLikes")}
						>
							Likes
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
							onClick={() => searchUserHandler(searchText)}
							className="bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
						>
							Search
						</Button>
					</div>
				</div>

				{/* Render user data */}
				<div className="w-full">
					<div className="grid p-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
						{userData.length > 0 ? (
							userData.map((user) => {
								const imagePath = user?.userImage
									? `${serverApi}/${user?.userImage}`
									: "/icons/default-user.svg";

								return (
									<div
										key={user._id}
										onClick={() => setModalOpenData(user._id)}
										className="shadow-lg cursor-pointer bg-white flex flex-col justify-between overflow-hidden rounded-lg transition-transform transform hover:scale-105"
									>
										<img
											src={imagePath}
											alt={user.userNick}
											className="object-cover h-48 w-full rounded-t-lg"
										/>
										<div className="p-4 flex flex-col flex-grow">
											<div className="flex justify-between items-start mb-2">
												<div className="flex flex-col">
													<div className="font-semibold flex flex-row items-center text-lg">
														<span>{user.userNick}</span>
														{user?.userType === UserType.STORE_OWNER ? (
															<span className="text-white text-sm">👑</span>
														) : (
															<span className="text-white text-sm">👤</span>
														)}
													</div>
													<div className="text-gray-600 text-sm">
														{user.userPhone}
													</div>
												</div>
												<div className="flex items-center">
													<div
														className={`flex items-center justify-center ${
															user.userViews > 0
																? "text-black"
																: "text-gray-200"
														}`}
													>
														{user.userViews}
														<VisibilityIcon
															sx={{ fontSize: 25, marginLeft: "5px" }}
														/>
													</div>
												</div>
											</div>
											<p className="text-gray-700 text-sm mb-4">
												{user.userDesc || "No description available."}
											</p>
                      <>
                        <UserCardActions user={user}/>
                      </>
										</div>
										<Button
											onClick={() => setModalOpenData(user._id)}
											color="primary"
											variant="contained"
											className="m-2"
										>
											Details
										</Button>
									</div>
								);
							})
						) : (
							<div className="col-span-full text-center text-gray-500">
								No users available
							</div>
						)}
					</div>

					<div className="flex justify-center my-4">
						<Pagination
							count={totalPages}
							page={userSearch.page}
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

			<ModalUser userId={isUserId} open={modalOpen} handleClose={handleClose} />
		</>
	);
};

export default Container;
