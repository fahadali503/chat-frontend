import { ILoginResponse } from "@/api/user.api";

export type IUser = {
    email: string,
    _id: string,
    createdAt: string,
    updatedAt: string
};

export type AuthLocalStorage = Omit<ILoginResponse, "message" | "success">