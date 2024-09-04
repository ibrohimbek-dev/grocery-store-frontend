import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";
import axios from "axios";

class ProductService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async getProductsBySort(input: ProductInquiry): Promise<Product[]> {
		try {
			let url = `${this.path}/user/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

			if (input.productCollection) {
				url += `&productCollection=${input.productCollection}`;
			}

			if (input.search) {
				url += `&search=${input.search}`;
			}

			if (input.productStatus) {
				url += `&productStatus=${input.productStatus}`;
			}

			const result = await axios.get(url);
			return result.data;
		} catch (error) {
			throw error;
		}
	}

	public async increaseView(productId: string): Promise<Product> {
		try {
			const url = `${this.path}/user/product/${productId}`;
			const result = await axios.get(url, { withCredentials: true });

			return result.data;
		} catch (error) {
			console.log("Error on getProductById =>", error);
			throw error;
		}
	}
}

export default ProductService;

// DONE!
