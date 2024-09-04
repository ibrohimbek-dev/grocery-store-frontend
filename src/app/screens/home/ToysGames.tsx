import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveToysGames } from "./selector";

// REDUX SELECTOR:
const toysGamesRetriever = createSelector(
	retrieveToysGames,
	(toysGamesSection) => ({ toysGamesSection })
);
const ToysGames = () => {
	const { toysGamesSection } = useSelector(toysGamesRetriever);

	console.log("toysGamesSection =>", toysGamesSection);

	return <div>ToysGames</div>;
};

export default ToysGames;
