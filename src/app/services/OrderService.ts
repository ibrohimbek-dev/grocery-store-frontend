import { serverApi } from "../../lib/config";
import {
	Order,
	OrderInquiry,
	OrderItemInput,
	OrderUpdateInput,
} from "../../lib/types/order";
import axios from "axios";
import { CartItem } from "../../lib/types/search";

class OrderService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async createOrder(input: CartItem[]): Promise<Order> {
		try {
			const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
				return {
					productId: cartItem._id,
					itemQuantity: cartItem.quantity,
					itemPrice: cartItem.price,
				};
			});

			const url = `${this.path}/user/order/create`;
			const result = await axios.post(url, orderItems, {
				withCredentials: true,
			});

			console.log("result on createOrder =>", result);
			return result.data;
		} catch (error) {
			console.log("Error on createOrder =>", error);
			throw error;
		}
	}

	public async getMyOrders(input: OrderInquiry): Promise<Order[]> {
		try {
			const url = `${this.path}/user/order/all`;
			const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

			const result = await axios.get(url + query, { withCredentials: true });

			return result.data;
		} catch (error) {			
			throw error;
		}
	}

	public async updateOrderStatus(input: OrderUpdateInput): Promise<Order> {
		try {
			const url = `${this.path}/user/order/update/status`;			
			const result = await axios.post(url, input, { withCredentials: true });			

			return result.data;
		} catch (error) {			
			throw error;
		}
	}
	public async deleteOrderHistory(orderId: string): Promise<Order> {
		try {
			const url = `${this.path}/user/order/delete/history/${orderId}`; 

			const result = await axios.delete(url, { withCredentials: true });

			return result.data;
		} catch (error) {
			console.log("Error on deleteOrderHistory =>", error);
			throw error;
		}
	}
}

export default OrderService;

// DONE!
