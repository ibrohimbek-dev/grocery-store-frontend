import { User, UserPaymentInput } from "./user";
import { Order } from "./order";
import { Product } from "./product";

// REACT APP STATE:
export interface AppRootState {
	homePage: HomePageState;
	productPage: ProductsPageState;
	orderPage: OrderPageState;
	modalPage: ModalProductState;
	usersPage: UsersPagetState;
}

export interface ModalProductState {
	modalProduct: Product | null;
}

export interface UsersPagetState {
	activeUsers: User[];
}

// HomePage PAGE TYPE INTERFACES:
export interface HomePageState {
	freshProduceSection: Product[];
	diaryProductsSection: Product[];
	meatPoultrySection: Product[];
	bakeryItemsSection: Product[];
	cannedGoodsSection: Product[];
	baveragesSection: Product[];
	topUsers: User[];
}

// PRODUCTS PAGE TYPE INTERFACES:
export interface ProductsPageState {
	freshProduceSection: Product[];
	diaryProductsSection: Product[];
	meatPoultrySection: Product[];
	bakeryItemsSection: Product[];
	cannedGoodsSection: Product[];
	baveragesSection: Product[];
	discounts: Product[];
	recommends: Product[];
	ads: Product[];
}

// ORDERS PAGE TYPE INTERFACES:
export interface OrderPageState {
	pausedOrders: Order[];
	processOrders: Order[];
	finishedOrders: Order[];
	userPayment: UserPaymentInput | null;
}
