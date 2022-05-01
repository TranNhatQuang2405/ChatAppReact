import { configureStore } from "@reduxjs/toolkit";
import DemoSlice from "./Slice/DemoSlice";
export const store = configureStore({
    reducer: {
        demo: DemoSlice,
    },
});