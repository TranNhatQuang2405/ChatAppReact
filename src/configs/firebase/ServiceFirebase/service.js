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
import { db } from "configs/firebase/config";

export const addRecord = async (colect, data) => {
    try {
        push(ref(db, colect), {
            ...data,
            createAt: serverTimestamp(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const findAll = async (colect, child) => {
    let listResult = [];
    const queryGet = query(ref(db, `${colect}/${child}`));
    await get(queryGet)
        .then((snapshot) => {
            snapshot.forEach((snapshotChild) => {
                let key = snapshotChild.key;
                let val = snapshotChild.val();
                listResult.push({ key, val });
            });
        })
        .catch((e) => console.log(e));
    return listResult;
};

export const findRecordString = async (colect, child, value) => {
    let listResult = [];

    const queryGet = query(ref(db, colect), orderByChild(child));
    await get(queryGet)
        .then((snapshot) => {
            snapshot.forEach((snapshotChild) => {
                let key = snapshotChild.key;
                let val = snapshotChild.val();
                if (val[child].includes(value)) listResult.push({ key, val });
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return listResult;
};

export const findExactRecord = async (colect, child, value) => {
    let listResult = [];

    const queryGet = query(
        ref(db, colect),
        orderByChild(child),
        equalTo(value)
    );
    await get(queryGet)
        .then((snapshot) => {
            snapshot.forEach((snapshotChild) => {
                let key = snapshotChild.key;
                let value = snapshotChild.val();
                listResult.push({ key, value });
            });
        })
        .catch((e) => {
            console.log(e);
        });
    return listResult;
};

export const updateRecord = async (colect, child, value, data) => {
    try {
        const queryGet = query(
            ref(db, colect),
            orderByChild(child),
            equalTo(value)
        );

        await get(queryGet)
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