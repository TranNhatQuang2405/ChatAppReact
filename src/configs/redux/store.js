import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./Slice/ThemeSlice";
import ShowMessageSlice from './Slice/ShowMessageSlice';
import UserSlice from "./Slice/UserSlice";
export const store = configureStore({
    reducer: {
        LocalTheme: ThemeSlice,
        ShowMessage: ShowMessageSlice,
        UserInfo: UserSlice,
    },
});