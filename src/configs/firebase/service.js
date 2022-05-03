import {
    ref,
    serverTimestamp,
    push,
    update,
    query,
    orderByChild,
    equalTo,
    get,
} from "firebase/database";
import { db } from "./config";

export const addRecord = (colect, data) => {
    try {
        push(ref(db, colect), {
            ...data,
            createAt: serverTimestamp(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const findId = (colect, data) => {};

export const updateRecord = (colect, child, value, data) => {
    try {
        const queryGet = query(
            ref(db, colect),
            orderByChild(child),
            equalTo(value)
        );

        get(queryGet)
            .then((snapshot) => {
                snapshot.forEach((snapshotChild) => {
                    let key = snapshotChild.key;
                    // let val = snapshotChild.val();
                    update(ref(db, `${colect}/${key}`), {
                        ...data,
                    });
                });
            })
            .catch((e) => console.log(e));
    } catch (error) {
        console.log(error);
    }
};