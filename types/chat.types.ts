import { IUser } from "./user.types";

export type IChat = {
    _id: string;
    participants: IUser[];
    createdAt: string;
    updatedAt: string;
}

export type IMessage = {
    _id: string;
    sender: IUser | string;
    content: string;
    chatId: string;
    createdAt: string;
    updatedAt: string;
}