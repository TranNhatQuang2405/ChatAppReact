import React from "react";
import { ref, onValue } from "firebase/database";
import { findUserKeyByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import { useDispatch } from "react-redux";
import { add } from "configs/redux/Slice/AllFriendSlice";
import { db } from "configs/firebase/config";

const useListFriend = (uid) => {
    const [key, setKey] = React.useState(null);
    const dispatch = useDispatch();
    React.useEffect(() => {
        let isMounted = true;
        const handleLoad = async () => {
            const friend = await findUserKeyByUid(uid);
            if (isMounted) setKey(friend);
        };
        handleLoad();
        return () => {
            isMounted = false;
        };
    }, [uid]);

    React.useEffect(() => {
        let dbRef = ref(db, `users/${key}/listFriend`);
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                const list = [];
                snapshot.forEach((childSnapshot) => {
                    list.push(childSnapshot.val().uid);
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

export default useListFriend;