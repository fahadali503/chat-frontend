import { IChat, IMessage } from "@/types/chat.types";
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

    async getChatMessages(chatId: string, page: number) {
        return await this._axiosInstance.get<IMessage[]>(`${this.url}/${chatId}/messages?page=${page}`);
    }

}