import { LoginInput, User, UserInput, UserUpdateInput } from "../../lib/types/user";
import axios from "axios";
import { serverApi } from "../../lib/config";

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

	public async userSignup(input: UserInput): Promise<User> {
		try {
			const url = this.path + "/user/signup";
			const result = await axios.post(url, input, { withCredentials: true });

			const user: User = result.data.user;
			localStorage.setItem("userData", JSON.stringify(user));

			return user;
		} catch (error) {
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
			const result = await axios.post(url, {}, { withCredentials: true });

			console.log("User Logout =>", result);
			localStorage.removeItem("userData");
		} catch (error) {
			console.log("Error on userLogout =>", error);
			throw error;
		}
	}

	public async updateMember(input: UserUpdateInput): Promise<User> {
		try {
			const formData = new FormData();
			formData.append("userNick", input.userNick || "");
			formData.append("userPhone", input.userPhone || "");
			formData.append("userAddress", input.userAddress || "");
			formData.append("userDesc", input.userNick || "");
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
}

export default UserService;

// DONE!
