import { User, UserPaymentInput } from "./user";
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
	freshProduceSection: [];
	dairyProductsSection: [];
	meatPoultrySection: [];
	bakeryItemsSection: [];
	cannedGoodsSection: [];
	baveragesSection: [];
	topUsers: [];
}

// PRODUCTS PAGE TYPE INTERFACES:
export interface ProductsPageState {
	storeOwner: User | null;
	chosenProduct: Product | null;
	products: Product[];
}

// ORDERS PAGE TYPE INTERFACES:
export interface OrderPageState {
	pausedOrders: Order[];
	processOrders: Order[];
	finishedOrders: Order[];
	userPayment: UserPaymentInput | null;
}
