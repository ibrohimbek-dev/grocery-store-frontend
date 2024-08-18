import React from "react";
import MainHome from "./MainHome";
import TopItems from "./TopItems";
import NewItems from "./NewItems";
import Recommend from "./Recommend";
import Sale from "./Sale";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import SideBar from "./SideBar";

const Home = () => {
	return (
		<div className="border-4 w-full flex flex-row justify-around items-center">
			<div className="flex flex-col items-center">
				<MainHome />
				<TopItems />
				<NewItems />
				<Recommend />
				<Sale />
				<Advertisement />
				<ActiveUsers />
			</div>
			<div className="">
				<SideBar />
			</div>
		</div>
	);
};

export default Home;
