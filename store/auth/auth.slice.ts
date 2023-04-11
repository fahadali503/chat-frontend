import { IUser } from "@/types/user.types";
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
        }
    }
});

export const { updateAuthAction } = authSlice.actions;
export default authSlice.reducer;