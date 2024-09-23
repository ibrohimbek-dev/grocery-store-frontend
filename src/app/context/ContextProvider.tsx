import { FC, ReactNode, useState } from "react";
import { GlobalContext } from "../hooks/useGlobal";
import Cookies from "universal-cookie";
import { User } from "../../lib/types/user";

const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const cookies = new Cookies();

	if (!cookies.get("accessToken")) {
		localStorage.removeItem("userData");
	}

	const userData = localStorage.getItem("userData")
		? JSON.parse(localStorage.getItem("userData") as string)
		: null;

	const [authUser, setAuthUser] = useState<User | null>(userData);

	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
	const [updateNum, setUpdateNum] = useState<number>(0);
	const [openSidebar, setOpenSidebar] = useState<boolean>(false);
	const [showHero, setShowHero] = useState<boolean>(false);

	return (
		<GlobalContext.Provider
			value={{
				authUser,
				setAuthUser,
				darkMode,
				setDarkMode,
				orderBuilder,
				setOrderBuilder,
				setUpdateNum,
				updateNum,
				openSidebar,
				setOpenSidebar,
				setShowHero,
				showHero,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextProvider;

// DONE!
