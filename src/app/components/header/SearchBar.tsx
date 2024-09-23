import React, { useEffect, useState, KeyboardEvent } from "react";
import { T } from "../../../lib/types/common";
import { FiSearch } from "react-icons/fi";
import { setSearchQuery } from "./searchSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import { sweetTopSmallInfoAlert } from "../../../lib/sweetAlert";
import { Messages } from "../../../lib/config";

// REDUX SELECTOR
const actionDispatch = (dispatch: Dispatch) => ({
	setSearchQuery: (data: String) => dispatch(setSearchQuery(data)),
});

const SearchBar = () => {
	const { setSearchQuery } = actionDispatch(useDispatch());
	const [inputValue, setInputValue] = useState("");
	const debouncedSearchTerm = useDebounce(inputValue, 300);

	useEffect(() => {
		setSearchQuery(debouncedSearchTerm);
	}, [debouncedSearchTerm, setSearchQuery]);

	const handleClickOnChange = (e: T) => {
		const query = e.target.value;
		setInputValue(query); // Update local state
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.keyCode === 13) {
			setSearchQuery(inputValue); // Trigger search on Enter
		}
	};

	return (
		<div className="flex w-1/2 items-center justify-between p-4 bg-transform">
			<div className="rounded-lg space-x-1 w-full flex items-center">
				<input
					className="w-full text-base shadow-md px-3 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-gray-700 placeholder-gray-400"
					placeholder="Search..."
					value={inputValue} // Controlled input
					onChange={handleClickOnChange}
					onKeyDown={handleKeyDown}
					required
				/>
				<div
					className="p-2 cursor-pointer shadow-md border border-gray-300 rounded-lg hover:scale-110 transition-all duration-200 ease-linear"
					onClick={() => {
						if (inputValue.trim() === "") {
							sweetTopSmallInfoAlert(Messages.TYPE_SEARCH_TERM).then();
						} else {
							setSearchQuery(inputValue);
						}
					}}
				>
					<FiSearch className="text-2xl" />
				</div>
			</div>
		</div>
	);
};

export default SearchBar;
