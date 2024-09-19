import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";
import { User } from "../../../lib/types/user";
import { serverApi } from "../../../lib/config";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const topUsersRetriever = createSelector(
	retrieveTopUsers,
	(topUsersSection) => ({ topUsersSection })
);

const ActiveUsers = () => {
	const { topUsersSection } = useSelector(topUsersRetriever);

	SwiperCore.use([Navigation, Pagination]);

	return (
		<div className="p-4 top-user-section bg-white h-auto overflow-hidden w-full shadow-md">
			<div className="text-lg font-semibold mb-4">Active Users</div>
			<Swiper
				className="cards-frame"
				slidesPerView={4} // Display max 4 users
				slidesPerGroup={1} // Slide one user at a time
				spaceBetween={30}
				navigation={{
					nextEl: ".user-swiper-button-next",
					prevEl: ".user-swiper-button-prev",
				}}
				pagination={{
					clickable: true,
				}}
			>
				{topUsersSection.length > 0 ? (
					topUsersSection.map((user: User, index) => {
						const imagePath = user.userImage
							? `${serverApi}/${user.userImage}`
							: "/icons/default-user.svg";

						return (
							<SwiperSlide key={index} className="user-card-frame">
								<div className="bg-white border rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:shadow-xl">
									<div className="relative aspect-w-1 aspect-h-1">
										<img
											src={imagePath}
											alt={user.userNick}
											className="object-cover w-full h-56 rounded-md"
										/>
									</div>
									<div className="p-4 text-center">
										<div className="text-md font-medium">{user.userNick}</div>
									</div>
								</div>
							</SwiperSlide>
						);
					})
				) : (
					<div className="text-center text-gray-500">
						No active users are available yet!
					</div>
				)}
			</Swiper>
			<div className="border-4 flex justify-center space-x-10 items-center mt-4">
				<FaAngleDoubleLeft className="user-swiper-button-prev hover:scale-110 transition-all ease-linear text-3xl cursor-pointer text-gray-600 hover:text-gray-800" />				
				<FaAngleDoubleRight className="user-swiper-button-next cursor-pointer hover:scale-110 transition-all ease-linear text-3xl text-gray-600 hover:text-gray-800" />
			</div>
		</div>
	);
};

export default ActiveUsers;

// TODO:  Shu qismiga keldim
