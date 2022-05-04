import { configureStore } from "@reduxjs/toolkit";
import ThemeSlice from "./Slice/ThemeSlice";
import ShowMessageSlice from './Slice/ShowMessageSlice';
import UserSlice from "./Slice/UserSlice";
import ListFriendWaitSlice from "./Slice/ListFriendWaitSlice";
import AllFriendSlice from "./Slice/AllFriendSlice";
export const store = configureStore({
    reducer: {
        LocalTheme: ThemeSlice,
        ShowMessage: ShowMessageSlice,
        UserInfo: UserSlice,
        ListFriendWait: ListFriendWaitSlice,
        AllFriend: AllFriendSlice,
    },
});