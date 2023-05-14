import { SocketLike } from "socket.io-react-hook/dist/types";
import { IUser } from "./user.types";
import { Socket } from "socket.io-client";

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

export type ISocket = SocketLike<Socket>;