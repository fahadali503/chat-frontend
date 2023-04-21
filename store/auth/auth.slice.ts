import { IUser } from "@/types/user.types";
import { AUTH_LOCAL_STORAGE_CONSTANT } from "@/utils/constants";
import { setValueToLocalStorage } from "@/utils/localstorage";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const AUTH_SLICE_KEY = "AUTH_SLICE_KEY";

export type AuthState = {
    token: string | null,
    user: IUser | null
};

const initialState: AuthState = {
    token: null,
    user: null
}

export const authSlice = createSlice({
    name: AUTH_SLICE_KEY,
    initialState: initialState,
    reducers: {
        updateAuthAction(state, { payload }: PayloadAction<AuthState>) {
            state.token = payload.token;
            state.user = payload.user;
        },

        addNewFriendAction(state, { payload }: PayloadAction<string>) {
            const friends = state.user!.friends;
            friends.push(payload);
            state.user!.friends = friends;
            setValueToLocalStorage(AUTH_LOCAL_STORAGE_CONSTANT, state);
        },

        removeFriendAction(state, { payload }: PayloadAction<string>) {
            state.user!.friends = state.user!.friends.filter(friend => friend !== payload);
            setValueToLocalStorage(AUTH_LOCAL_STORAGE_CONSTANT, state);
        }
    }
});

export const { updateAuthAction, addNewFriendAction, removeFriendAction } = authSlice.actions;
export default authSlice.reducer;