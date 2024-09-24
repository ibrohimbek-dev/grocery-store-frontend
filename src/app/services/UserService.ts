import {
	LoginInput,
	User,
	UserInquiry,
	UserPaymentInput,
	UserUpdateInput,
} from "../../lib/types/user";
import axios from "axios";
import { serverApi } from "../../lib/config";
import { Like } from "../../lib/types/like";

class UserService {
	private readonly path: string;

	constructor() {
		this.path = serverApi;
	}

	public async getTopUsers(): Promise<User[]> {
		try {
			const url = this.path + "/user/top-users";
			const result = await axios.get(url);
			return result.data;
		} catch (error) {
			console.log("Error on getTopUsers =>", error);
			throw error;
		}
	}

	public async getAllUsersBySort(input: UserInquiry): Promise<User[]> {
		try {
			let url = `${this.path}/user/users/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

			if (input.search) {
				url += `&search=${input.search}`;
			}

			const result = await axios.get(url);
			return result.data;
		} catch (error) {
			throw error;
		}
	}

	public async increaseUserView(userId: string): Promise<User> {
		try {
			const url = `${this.path}/user/users/${userId}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data;
		} catch (error) {
			console.log("Error on increaseUserView =>", error);
			throw error;
		}
	}

	public async likeTargetUser(userId: string): Promise<User> {
		try {
			const url = `${this.path}/user/users/like/${userId}`;
			const result = await axios.get(url, { withCredentials: true });

			return result.data;
		} catch (error) {
			console.log("Error on likeTargetUser =>", error);
			throw error;
		}
	}

	public async getMyUserLikes(userId: string): Promise<Like[] | null> {
		try {
			const url = `${this.path}/user/users/get/likes/${userId}`;
			const result = await axios.get(url, { withCredentials: true });

			return result.data;
		} catch (error) {
			console.log("Error on getMyUserLikes =>", error);
			throw error;
		}
	}

	public async getShop(): Promise<User> {
		try {
			const url = this.path + "/user/restaurant";
			const result = await axios.get(url);

			const restaurant: User = result.data;
			return restaurant;
		} catch (error) {
			throw error;
		}
	}

	public async userSignup(formData: FormData): Promise<User> {
		try {
			const result = await axios.post(`${this.path}/user/signup`, formData, {
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const user: User = result.data.user;
			localStorage.setItem("userData", JSON.stringify(user));

			return user;
		} catch (error) {
			console.log("Error during signup =>", error);
			throw error;
		}
	}

	public async userLogin(input: LoginInput): Promise<User> {
		try {
			const url = this.path + "/user/login";
			const result = await axios.post(url, input, { withCredentials: true });
			const user: User = result.data.user;

			localStorage.setItem("userData", JSON.stringify(user));
			return user;
		} catch (error) {
			throw error;
		}
	}

	public async userLogout(): Promise<void> {
		try {
			const url = this.path + "/user/logout";
			await axios.post(url, {}, { withCredentials: true });

			localStorage.removeItem("userData");
		} catch (error) {
			console.log("Error on userLogout =>", error);
			throw error;
		}
	}

	public async updateUser(input: UserUpdateInput): Promise<User> {
		try {
			const formData = new FormData();
			formData.append("userNick", input.userNick || "");
			formData.append("userPhone", input.userPhone || "");
			formData.append("userAddress", input.userAddress || "");
			formData.append("userDesc", input.userDesc || "");
			formData.append("userImage", input.userImage || "");

			const result = await axios(`${this.path}/user/update`, {
				method: "POST",
				data: formData,
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const user: User = result.data;
			localStorage.setItem("userData", JSON.stringify(user));
			return user;
		} catch (error) {
			console.log("Error on updateMember =>", error);
			throw error;
		}
	}

	public async userRegisterPaymentData(input: UserPaymentInput): Promise<void> {
		try {
			const url = this.path + "/user/add/payment";
			await axios.post(url, input, { withCredentials: true });
		} catch (error) {
			console.log("Error on userRegisterPaymentData =>", error);
			throw error;
		}
	}

	public async getUserPaymentDataById(
		userId: string
	): Promise<UserPaymentInput> {
		try {
			const url = `${this.path}/user/payment/${userId}`;
			const result = await axios.get(url, { withCredentials: true });
			return result.data;
		} catch (error) {
			console.log("Error on getUserPaymentDataById =>", error);
			throw error;
		}
	}
}

export default UserService;

// DONE!
