import { createContext, useContext } from "react";
import { User } from "../../lib/types/user";

interface GBInterface {
	authUser: User | null;
	setAuthUser: (user: User | null) => void;
	darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void
}

export const GlobalContext = createContext<GBInterface | undefined>(undefined);

export const useGlobals = () => {
	const context = useContext(GlobalContext);

	if (context === undefined) {
		throw new Error("You should use useGlobals within Provider!");
	}

	return context;
};


// DONE!