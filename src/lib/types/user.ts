import { UserStatus, UserType } from "../enums/user.enum";

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
	userPoints?: number;
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

export interface LoginInput {
	userNick: string;
	userPassword: string;
}

export interface UserUpdateInput {
	_id: string;
	userStatus?: UserStatus;
	userNick?: string;
	userPhone?: string;
	userPassword?: string;
	userAddress?: string;
	userDesc?: string;
	userImage?: string;
}
