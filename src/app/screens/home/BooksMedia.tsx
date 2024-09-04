import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveBooksMedia } from "./selector";

// REDUX SELECTOR:
const booksMediaRetriever = createSelector(
	retrieveBooksMedia,
	(booksMediaSection) => ({ booksMediaSection })
);

const BooksMedia = () => {
	const { booksMediaSection } = useSelector(booksMediaRetriever);

	console.log("booksMediaSection=>", booksMediaSection);
	return <div>BooksMedia</div>;
};

export default BooksMedia;
