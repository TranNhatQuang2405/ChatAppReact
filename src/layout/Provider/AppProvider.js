import React from "react";
import { useSelector } from "react-redux";
import useListFriend from "configs/customHook/useListFriend";
import useListGroup from "configs/customHook/useListGroup";
import useRequest from "configs/customHook/useRequest";
function AppProvider({ children }) {
    const currentUser = useSelector((state) => state.UserInfo.user);
    console.log("Re");
    // useListFriend(
    //     currentUser && currentUser.key,
    //     currentUser && currentUser.uid
    // );
    useListGroup(
        currentUser && currentUser.key,
        currentUser && currentUser.uid
    );
    useRequest(currentUser && currentUser.key, currentUser && currentUser.uid);

    return <>{children}</>;
}

export default React.memo(AppProvider);
