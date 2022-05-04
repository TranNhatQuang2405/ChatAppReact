import React from "react";
import { ref, onValue } from "firebase/database";
import { findUserKeyByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import { db } from "configs/firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { GetAll } from "configs/redux/Slice/ListFriendWaitSlice";
const useFriendRequest = (uid) => {
    const [key, setKey] = React.useState(null);
    const listFriendWait = useSelector(
        (state) => state.ListFriendWait.listUser
    );

    const dispatch = useDispatch();
    React.useEffect(() => {
        let isMounted = true;
        const handleLoad = async () => {
            const friend = await findUserKeyByUid(uid);
            if (isMounted) setKey(friend);
        };
        if (uid) handleLoad();
        return () => {
            isMounted = false;
        };
    }, [uid]);

    React.useEffect(() => {
        let dbRef = ref(db, `users/${key}/listInvite`);
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                const list = [];
                snapshot.forEach((childSnapshot) => {
                    list.push({
                        key: childSnapshot.key,
                        val: childSnapshot.val(),
                    });
                });
                if (list.length !== listFriendWait.length)
                    dispatch(GetAll(uid));
                else {
                    var i = 0;
                    while (i < list.length) {
                        console.log(list[i]);
                        if (listFriendWait.indexOf(list[i]) === -1) {
                            dispatch(GetAll(uid));
                            break;
                        }
                        i++;
                    }
                }
            },
            {
                onlyOnce: false,
            }
        );
        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key, uid]);
};

export default useFriendRequest;