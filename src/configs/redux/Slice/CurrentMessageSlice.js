import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { findMessageByKey } from "configs/firebase/ServiceFirebase/ServiceFind";

const initialState = {
    data: null,
};

export const GetCurrentMessage = createAsyncThunk(
    "CurrentMessage/getList",
    async ({ key, typeMessage, friend }) => {
        if (typeMessage === 1) {
            return {
                val: await findMessageByKey(key),
                typeMessage: typeMessage,
                friend: friend,
            };
        }
        if (typeMessage === 2)
            return {
                val: await findMessageByKey(key),
                typeMessage: typeMessage,
                friend: null,
            };
    }
);

export const CurrentMessageSlice = createSlice({
    name: "CurrentMessage",
    initialState,
    reducers: {
        clear: (state) => {
            state.data = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(GetCurrentMessage.pending, (state, action) => {});
        builder.addCase(GetCurrentMessage.fulfilled, (state, action) => {
            const value = action.payload.val;
            const type = action.payload.typeMessage;
            const friend = action.payload.friend;
            if (type === 1) {
                if (value.val) {
                    state.data = {
                        type: 1,
                        listChildMessage: value.val.listChildMessage,
                        listUser: value.val.listUser,
                        name: friend.displayName,
                        key: value.key,
                        photoURL: friend.photoURL,
                        keyUser: friend.key,
                        UidFriend: friend.uid,
                        timeUpdate: value.val.timeUpdate,
                        describe: null,
                        email: friend.email,
                        isOnline: friend.isOnline,
                    };
                } else {
                    state.data = {
                        type: 1,
                        listChildMessage: null,
                        listUser: null,
                        UidFriend: friend.uid,
                        name: friend.displayName,
                        key: null,
                        photoURL: friend.photoURL,
                        timeUpdate: null,
                        describe: null,
                        email: friend.email,
                        isOnline: friend.isOnline,
                        keyUser: friend.key,
                    };
                }
            }
            if (type === 2) {
                state.data = {
                    type: 2,
                    listChildMessage: value.val.listChildMessage,
                    listUser: value.val.listUser,
                    name: value.val.name,
                    key: value.key,
                    photoURL: value.val.photoURL,
                    timeUpdate: value.val.timeUpdate,
                    describe: value.val.describe,
                    isOnline: true,
                };
            }
            // state.listUser = action.payload;
        });
    },
});

// Action creators are generated for each case reducer function
export const { clear } = CurrentMessageSlice.actions;

export default CurrentMessageSlice.reducer;