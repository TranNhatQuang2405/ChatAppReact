import { update, ref } from "firebase/database";
import { updateRecord } from "./service";
import { getAllChildMessage } from "./ServiceFind";
import { db } from "../config";

export const updateStatus = async (user) => {
    await updateRecord("users", "uid", user.uid, {
        IsOnline: true,
    });
};

export const updateLogOut = async (userId) => {
    await updateRecord("users", "uid", userId, {
        IsOnline: false,
    });
};

export const updateListSeen = async (userId, key) => {
    const message = await getAllChildMessage(key);
    message.forEach(async (value) => {
        if (value.val.listSeen && value.val.listSeen.indexOf(userId) === -1) {
            await update(
                ref(db, `messages/${key}/listChildMessage/${value.key}`),
                {
                    ...value.val,
                    listSeen: [...value.val.listSeen, userId],
                }
            );
        }
    });
};