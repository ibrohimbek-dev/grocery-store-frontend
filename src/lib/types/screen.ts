import { User } from "./user";
import { Order } from "./order";
import { Product } from "./product";

// REACT APP STATE:
export interface AppRootState {
	homePage: HomePageState;
	productPage: ProductsPageState;
	orderPage: OrderPageState;
	modalPage: ModalProductState;
}

export interface ModalProductState {
	modalProduct: Product | null;
}

// HomePage PAGE TYPE INTERFACES:
export interface HomePageState {
	electronicsSection: [];
	textTilesSection: [];
	homeLivingSection: [];
	beautyCareSection: [];
	sportsOutdoorsSection: [];
	toysGamesSection: [];
	booksMediaSection: [];
	grocerySection: [];
	automotiveSection: [];
	healthWellness: [];
	topUsers: [];
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
