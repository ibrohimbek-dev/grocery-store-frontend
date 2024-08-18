import { User } from "./user";
import { Order } from "./order";
import { Product } from "./product";

// REACT APP STATE:
export interface AppRootState {
	homePage: HomePageState;
	productPage: ProductsPageState;
	orderPage: OrderPageState;
}

// HOME PAGE TYPE INTERFACES:
export interface HomePageState {
	popularProducts: Product[];
	newProducts: Product[];
	topUsers: User[];
}

// PRODUCTS PAGE TYPE INTERFACES:
export interface ProductsPageState {
	shopOwner: User | null;
	chosenProduct: Product | null;
	products: Product[];
}

// ORDERS PAGE TYPE INTERFACES:
export interface OrderPageState {
	pausedOrders: Order[];
	processOrders: Order[];
	finishedOrders: Order[];
}
