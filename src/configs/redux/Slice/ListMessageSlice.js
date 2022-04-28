import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllListFriend } from "configs/firebase/ServiceFirebase/ServiceFind";

const initialState = {
    listMessage: [],
    pending: true,
};

export const GetListMessage = createAsyncThunk(
    "ListMessage/getAllMessage",
    async (uid) => {
        return await getAllListFriend(uid);
    }
);

export const MessageSlice = createSlice({
    name: "ListMessage",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetListMessage.pending, (state, action) => {
            state.pending = true;
        });
        builder.addCase(GetListMessage.fulfilled, (state, action) => {
            state.listFriend = action.payload;
            state.pending = false;
        });
    },
});

// Action creators are generated for each case reducer function
// export const {} = AllFriendSlice.actions;

export default MessageSlice.reducer;
