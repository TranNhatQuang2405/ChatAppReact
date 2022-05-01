import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./Slice/ThemeSlice";
import ShowMessageSlice from './Slice/ShowMessageSlice';

export const store = configureStore({
    reducer: {
        LocalTheme: ThemeSlice,
        ShowMessage: ShowMessageSlice,
    },
});