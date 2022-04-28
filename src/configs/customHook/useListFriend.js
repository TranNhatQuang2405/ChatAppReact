import React from "react";
import { ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { GetAll } from "configs/redux/Slice/AllFriendSlice";
import { db } from "configs/firebase/config";
const useListFriend = (key, uid) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        console.log("REE");

        let dbRef = ref(db, `users/${key}/listFriend`);
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                console.log(snapshot.exists());
                if (snapshot.exists()) {
                    dispatch(GetAll(uid));
                }
            },
            {
                onlyOnce: false,
            }
        );
        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    return [true];
};

export default useListFriend;
