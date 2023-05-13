import { IUser } from "./user.types";

export type IChat = {
    _id: string;
    participants: IUser[];
    createdAt: string;
    updatedAt: string;
}