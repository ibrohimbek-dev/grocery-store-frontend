import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveTopUsers } from "./selector";
import { User } from "../../../lib/types/user";
import { serverApi } from "../../../lib/config";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import "swiper/css";
import { GoArrowUpRight } from "react-icons/go";
import { NavLink } from "react-router-dom";

const topUsersRetriever = createSelector(
	retrieveTopUsers,
	(topUsersSection) => ({ topUsersSection })
);

const ActiveUsers = () => {
	const { topUsersSection } = useSelector(topUsersRetriever);

	SwiperCore.use([]);

	return (
		<div className="p-4 bg-white h-auto overflow-hidden w-full shadow-md">
			<div className="text-lg font-semibold mb-4">Top Users</div>
			<Swiper
				className="cards-frame"
				slidesPerView={4}
				spaceBetween={30}
				centeredSlides={false}
				slidesPerGroup={1}
			>
				{topUsersSection.length > 0 ? (
					topUsersSection.map((user: User, index) => {
						const imagePath = user.userImage
							? `${serverApi}/${user.userImage}`
							: "/icons/default-user.svg";

						return (
							<SwiperSlide key={index} className="user-card-frame">
								<div className="bg-white border rounded-lg overflow-hidden shadow-xl transition-transform duration-200 hover:shadow-xl">
									<div className="relative overflow-hidden aspect-w-1 aspect-h-1">
										<img
											src={imagePath}
											alt={user.userNick}
											className="object-cover hover:scale-110 transition-all ease-linear duration-200 cursor-pointer w-full h-56 rounded-md"
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
			{topUsersSection.length > 0 && (
				<div className="w-full flex justify-center items-center mt-4">
					<div className="w-32 rounded-md cursor-pointer mb-2 font-semibold flex justify-center items-center space-x-2 px-4 py-2 bg-blue-300 hover:bg-blue-500 transition-all ease-linear">
						<NavLink
							className={"flex items-center justify-center"}
							to={"/store/users/active-users"}
						>
							See More
							<GoArrowUpRight className="text-2xl" />
						</NavLink>
					</div>
				</div>
			)}
		</div>
	);
};

export default ActiveUsers;
