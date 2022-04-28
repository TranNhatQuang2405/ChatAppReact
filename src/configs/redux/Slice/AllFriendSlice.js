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
            state.listFriend = action.payload;
        },
        remove: (state, action) => {
            state.pending = false;
            state.listFriend = state.listFriend.filter((value) => {
                return value.key !== action.payload.key;
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
