import { IUser } from "@/types/user.types";
import { axiosInstance } from ".";

export type IAuthResponse = {
    success: boolean,
    message: string,
    user: IUser
}

export type IAuthErrorResponse = Omit<IAuthResponse, 'user'>;

export type IAuthData = {
    email: string,
    password: string,
}
export type ILoginResponse = IAuthResponse & { token: string };

export async function authApi<ReturnResponse extends IAuthResponse = IAuthResponse
    , D extends IAuthData = IAuthData>(url: string, data: D)
    : Promise<ReturnResponse> {

    const response = await axiosInstance.post<ReturnResponse>(`/users${url}`, data);
    return response.data;
}