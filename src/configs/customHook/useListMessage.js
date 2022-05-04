import React from "react";
import { ref, onValue, query, get } from "firebase/database";
import { useDispatch } from "react-redux";
import { clear, setList } from "configs/redux/Slice/ListMessageSlice";
import { db } from "configs/firebase/config";
// import { findMessageByKey } from "configs/firebase/ServiceFirebase/ServiceFind";

const useListMessage = (key, uid) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        let dbRef = query(ref(db, `users/${key}/listMessage`));
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                console.log("ListMessage: ", snapshot.exists());
                if (snapshot.exists()) {
                    const list = [];
                    snapshot.forEach((childsnapshot) => {
                        list.push(childsnapshot.val());
                    });
                    dispatch(setList(list));
                    // snapshot.forEach((snapshotchild) => {
                    //     var val = snapshotchild.val();
                    //     const result = findMessageByKey(val.messageId);
                    //     list.push(result);
                    // });

                    // const re = Promise.all(list);
                    // dispatch(SetListMessage(re));
                } else {
                    get(dbRef).then((snapshot) => {
                        if (!snapshot.exists()) {
                            dispatch(clear());
                        }
                    });
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

export default useListMessage;