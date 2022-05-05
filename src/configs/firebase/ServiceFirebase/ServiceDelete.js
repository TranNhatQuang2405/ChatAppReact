import { deleteRecord, findExactRecord } from "./service";
import { findMessageByKey } from "./ServiceFind";
import { db } from "../config";
import { ref, update } from "firebase/database";

export const deleteInvite = async (KeyId, friendUid, currentUserId) => {
    await deleteRecord(`users/${KeyId}/listInvite`, "uid", currentUserId);
    
    const value = await findExactRecord("users", "uid", currentUserId);
    if (value && Array.isArray(value))
        await deleteRecord(`users/${value[0].key}/listWait`, "uid", friendUid);
};

export const denyFriend = async (friendUid, currentUserId) => {
    const friend = await findExactRecord("users", "uid", friendUid);
    const value = await findExactRecord("users", "uid", currentUserId);
    if (value && friend && Array.isArray(value) && Array.isArray(friend)) {
        await deleteRecord(
            `users/${friend[0].key}/listWait`,
            "uid",
            currentUserId
        );
        await deleteRecord(
            `users/${value[0].key}/listInvite`,
            "uid",
            friendUid
        );
    }
};

export const deleteFriend = async (friendUid, currentUserId) => {
    const friend = await findExactRecord("users", "uid", friendUid);
    const value = await findExactRecord("users", "uid", currentUserId);
    if (value && friend && Array.isArray(value) && Array.isArray(friend)) {
        await deleteRecord(
            `users/${value[0].key}/listFriend`,
            "uid",
            friendUid
        );
        await deleteRecord(
            `users/${friend[0].key}/listFriend`,
            "uid",
            currentUserId
        );
    }
};

export const leaveGroup = async (keyId, keyMessage, uid) => {
    if (keyId && keyMessage) {
        await deleteRecord(
            `users/${keyId}/listMessage`,
            "messageId",
            keyMessage
        );
        const value = await findMessageByKey(keyMessage);
        const list = value.val.listUser.filter((value) => value !== uid);
        await update(ref(db, `messages/${keyMessage}`), {
            ...value.val,
            listUser: [...list],
        });
    }
};

export const deleteMessage = async (keyM, keyU) => {
    if (keyM && keyU) {
        await deleteRecord(`users/${keyU}/listMessage`, "messageId", keyM);
    }
};