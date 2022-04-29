import React from "react";
import { ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { db } from "configs/firebase/config";
import { GetAll } from "configs/redux/Slice/ListFriendWaitSlice";
const useRequest = (key, uid) => {
    const dispatch = useDispatch();

    console.log("Ree Re");
    React.useEffect(() => {
        let dbRef = ref(db, `users/${key}/listInvite`);
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                console.log(snapshot.exists());
                dispatch(GetAll(uid));
            },
            {
                onlyOnce: false,
            }
        );
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    return [true];
};

export default useRequest;
