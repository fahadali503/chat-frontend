import { ILoginResponse } from "@/api/user.api";

export type IUser = {
    email: string,
    _id: string,
    friends: string[],
    createdAt: string,
    updatedAt: string
};

export type AuthLocalStorage = Omit<ILoginResponse, "message" | "success">