import { IChat } from "@/types/chat.types";
import { BaseApi } from ".";


export class ChatApi extends BaseApi {
    constructor() {
        super("/chat");
    }

    async createChat(friendId: string) {
        return await this._axiosInstance.post<IChat>(`${this.url}/create`, { friendId });
    }

    async getUserChats() {
        return await this._axiosInstance.get<IChat[]>(`${this.url}/all`);
    }

}