import React from "react";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { useDispatch } from "react-redux";
import { GetAll } from "configs/redux/Slice/AllGroupSlice";
import { db } from "configs/firebase/config";

const useListGroup = (key, uid) => {
    const dispatch = useDispatch();

    console.log("Ree group");
    React.useEffect(() => {
        let dbRef = query(
            ref(db, `users/${key}/listMessage`),
            orderByChild("type"),
            equalTo(2)
        );
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
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    return [true];
};

export default useListGroup;
