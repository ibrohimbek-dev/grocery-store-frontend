import React from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { retrieveTextTiles } from "./selector";

// REDUX SELECTOR:
const textTileRetriver = createSelector(
	retrieveTextTiles,
	(textTileSection) => ({ textTileSection })
);
const TextTiles = () => {
  const { textTileSection } = useSelector(textTileRetriver);
  
  console.log("textTileSection =>", textTileSection);
	return <div>TextTiles</div>;
};

export default TextTiles;
