import { FC, ReactNode, useState } from "react";
import { User } from "@/lib/types/user";
import { GlobalContext } from "../hooks/useGlobal";
import Cookies from "universal-cookie";

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

	return (
		<GlobalContext.Provider
			value={{ authUser, setAuthUser, darkMode, setDarkMode }}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextProvider;
