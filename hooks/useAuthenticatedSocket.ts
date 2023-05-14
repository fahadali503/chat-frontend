import { API_URL } from '@/api';
import { useSocket } from 'socket.io-react-hook';
import { getValueFromLocalStorage } from '@/utils/localstorage';
import { AUTH_LOCAL_STORAGE_CONSTANT } from '@/utils/constants';
import { AuthLocalStorage } from '@/types/user.types';

export const useAuthenticatedSocket = () => {
    const item = getValueFromLocalStorage<AuthLocalStorage>(AUTH_LOCAL_STORAGE_CONSTANT)
    return useSocket(API_URL, {
        extraHeaders: {
            "Authorization": `Bearer ${item?.token}`
        },
    });
};