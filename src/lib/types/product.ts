import { ProductCollection, ProductStatus } from "../enums/product.enum";

export interface Product {
	_id: string;
	productStatus: ProductStatus;
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productSize: string;
	productDesc?: string;
	productImages: string[];
  productViews: number;
  productLikes?: number;
}

export interface ProductInquiry {
	order: string;
	page: number;
	limit: number;
	productCollection?: ProductCollection;
	productStatus?: ProductStatus;
	search?: string;
}

export interface ProductInput {
	productCollection: ProductCollection;
	productName: string;
	productPrice: number;
	productLeftCount: number;
	productBrand: string;
	productStatus?: ProductStatus;
	productSize?: string;
	productDesc?: string;
	productImages?: string[];
	productViews?: number;
	productLikes?: number;
}

export interface ProductUpdateInput {
	_id: string;
	productStatus?: ProductStatus;
	productCollection?: ProductCollection;
	productName?: string;
	productPrice?: number;
	productLeftCount?: number;
	productSize?: string;
	productDesc?: string;
	productImages?: string[];
	productViews?: number;
}
