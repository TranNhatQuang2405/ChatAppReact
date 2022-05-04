import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllListFriend } from "configs/firebase/ServiceFirebase/ServiceFind";

const initialState = {
    listFriend: [],
    pending: true,
};

export const GetAll = createAsyncThunk("AllFriend/getall", async (uid) => {
    return await getAllListFriend(uid);
});

export const AllFriendSlice = createSlice({
    name: "AllFriend",
    initialState,
    reducers: {
        add: (state, action) => {
            state.pending = false;
            action.payload.forEach((child) => {
                if (state.listFriend.indexOf(child) === -1)
                    state.listFriend.push(child);
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetAll.pending, (state, action) => {
            state.pending = true;
        });
        builder.addCase(GetAll.fulfilled, (state, action) => {
            state.listFriend = action.payload;
            state.pending = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { add } = AllFriendSlice.actions;

export default AllFriendSlice.reducer;