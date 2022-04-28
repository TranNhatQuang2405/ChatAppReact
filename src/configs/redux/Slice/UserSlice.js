import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    pending: true,
};

export const Login = createAsyncThunk("user/login", async () => {
    return null;
});

export const Logout = createAsyncThunk("user/logout", async () => {
    return null;
});

export const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        LogIn: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            state.pending = false;
        },
        LogOut: (state) => {
            state.user = null;
            state.pending = false;
        },
        SetIsPending: (state) => {
            state.pending = true;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(Login.pending, (state, action) => {
            state.pending = true;
        });
        builder.addCase(Login.fulfilled, (state, action) => {
            state.pending = false;
        });
        builder.addCase(Logout.pending, (state, action) => {
            state.pending = true;
        });
        builder.addCase(Logout.fulfilled, (state, action) => {
            state.pending = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { LogIn, LogOut, SetIsPending } = UserSlice.actions;

export default UserSlice.reducer;
