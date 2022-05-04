import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllListWait } from "configs/firebase/ServiceFirebase/ServiceFind";

const initialState = {
    listUser: [],
};

export const GetAll = createAsyncThunk("listFriendWait/getall", async (uid) => {
    return await getAllListWait(uid);
});

export const ListFriendWaitSlice = createSlice({
    name: "ListFriendWait",
    initialState,
    reducers: {
        add: (state, action) => {},
        clear: (state) => {
            state.listUser = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetAll.pending, (state, action) => {});
        builder.addCase(GetAll.fulfilled, (state, action) => {
            state.listUser = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { clear, add } = ListFriendWaitSlice.actions;

export default ListFriendWaitSlice.reducer;