import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const SELECTED_CHAT_SLICE_KEY = "SELECTED_CHAT_SLICE_KEY";

export type SelectedChatState = string;

const initialState: SelectedChatState = '';

export const selectedChatSlice = createSlice({
    name: SELECTED_CHAT_SLICE_KEY,
    initialState: initialState,
    reducers: {

    }
});

export const { } = selectedChatSlice.actions;
export default selectedChatSlice.reducer;