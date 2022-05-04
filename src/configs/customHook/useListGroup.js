import React from "react";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import { findUserKeyByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import { useDispatch } from "react-redux";
import { add } from "configs/redux/Slice/AllGroupSlice";
import { db } from "configs/firebase/config";

const useListGroup = (uid) => {
    const [key, setKey] = React.useState(null);
    const dispatch = useDispatch();
    React.useEffect(() => {
        let isMounted = true;
        const handleLoad = async () => {
            const you = await findUserKeyByUid(uid);
            if (isMounted) setKey(you);
        };
        if (uid) handleLoad();
        return () => {
            isMounted = false;
        };
    }, [uid]);

    React.useEffect(() => {
        let dbRef = query(
            ref(db, `users/${key}/listMessage`),
            orderByChild("type"),
            equalTo(2)
        );
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                const list = [];
                snapshot.forEach((childSnapshot) => {
                    list.push(childSnapshot.val().messageId);
                });
                dispatch(add(list));
            },
            {
                onlyOnce: false,
            }
        );
        return unsubscribe;
    }, [dispatch, key]);
    return [true];
};

export default useListGroup;