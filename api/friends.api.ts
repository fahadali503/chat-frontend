import { IUser } from "@/types/user.types";
import { BaseApi } from ".";


export class FriendsApi extends BaseApi {
    async getNonFriends() {
        return await this._axiosInstance.get<IUser[]>(`${this.url}/non-friends`);
    }

    async addFriend(userId: string) {
        return await this._axiosInstance.post<{ message: string, friendId: string }>(`${this.url}/new`, { userId })
    }

    async getAllFriends() {
        return await this._axiosInstance.get<IUser[]>(`${this.url}/all`);
    }

    async removeFriend(userId: string) {
        return await this._axiosInstance.post<{ message: string, friendId: string }>(`${this.url}/remove`, { userId })
    }

}