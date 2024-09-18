import { UserPaymentCard, UserStatus, UserType } from "../enums/user.enum";

export interface User {
	_id: string;
	userType: UserType;
	userStatus: UserStatus;
	userNick: string;
	userPhone: string;
	userPassword?: string;
	userAddress?: string;
	userImage?: string;
	userDesc?: string;
	userPoints: number;
	userViews: number;
	userLikes: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserInput {
	userNick: string;
	userPhone: string;
	userPassword: string;
	userType?: UserType;
	userStatus?: UserStatus;
	userAddress?: string;
	userDesc?: string;
	userImage?: string;
	userPoints?: number;
}

export interface UserInquiry {
	order: string;
	page: number;
	limit: number;
	search?: string;
}

export interface UserPaymentInput {
	userId?: string;
	cardType: UserPaymentCard;
	cardNumber: string;
	expirationDate: string;
	cvv: string;
	cardholderName: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface LoginInput {
	userNick: string;
	userPassword: string;
}

export interface UserUpdateInput {
	userStatus?: UserStatus;
	userNick?: string;
	userPhone?: string;
	userPassword?: string;
	userAddress?: string;
	userDesc?: string;
	userImage?: string;
}

