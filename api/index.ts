import { AuthLocalStorage } from '@/types/user.types';
import { AUTH_LOCAL_STORAGE_CONSTANT } from '@/utils/constants';
import { getValueFromLocalStorage } from '@/utils/localstorage';
import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:4000"
});


export class BaseApi {
    protected _axiosInstance: AxiosInstance = axiosInstance;
    constructor(protected url: string) {
        this._axiosInstance.interceptors.request.use((config) => {
            const authData = getValueFromLocalStorage<AuthLocalStorage>(AUTH_LOCAL_STORAGE_CONSTANT);
            if (authData) {
                config.headers.Authorization = `Bearer ${authData.token}`;
            }
            return config;
        })
    }
}