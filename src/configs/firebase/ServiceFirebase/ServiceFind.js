import {
    findRecordString,
    findAllChildOfSpecialCollect,
    findExactRecord,
    findAllChildOfRecord,
} from "./service";

export const findFriendToInvite = async (searchInvite, uid) => {
    const listFriend = await findRecordString(
        "users",
        "displayName",
        searchInvite
    );
    const listCurrentFriend = await findAllChildOfSpecialCollect(
        "users",
        "uid",
        uid,
        "listFriend"
    );

    //Danh sach minh gui ket ban
    const listCurrentInvite = await findAllChildOfSpecialCollect(
        "users",
        "uid",
        uid,
        "listWait"
    );

    //Danh sach minh nhan loi moi
    const listCurrentWait = await findAllChildOfSpecialCollect(
        "users",
        "uid",
        uid,
        "listInvite"
    );

    const listUid = [];

    listUid.push(...listCurrentFriend.map((value) => value.val.uid));
    listUid.push(...listCurrentInvite.map((value) => value.val.uid));
    listUid.push(...listCurrentWait.map((value) => value.val.uid));
    const result = listFriend.filter((friend) => {
        if (friend.val.uid !== uid && listUid.indexOf(friend.val.uid) === -1)
            return true;
        return false;
    });
    return result;
};

export const getAllListWait = async (uid) => {
    const listFriendWait = await findAllChildOfSpecialCollect(
        "users",
        "uid",
        uid,
        "listInvite"
    );

    return listFriendWait;
};

export const findUserByUid = async (uid) => {
    const result = await findExactRecord("users", "uid", uid);
    if (result && result.length > 0) return result[0].val;
    return result;
};

export const findUserAndKeyByUid = async (uid) => {
    const result = await findExactRecord("users", "uid", uid);
    if (result && result.length > 0)
        return { key: result[0].key, val: result[0].val };
    return null;
};
export const findUserKeyByUid = async (uid) => {
    const result = await findExactRecord("users", "uid", uid);
    if (result && result.length > 0) return result[0].key;
    return result;
};

export const getAllListFriend = async (uid) => {
    const listFriend = await findAllChildOfSpecialCollect(
        "users",
        "uid",
        uid,
        "listFriend"
    );
    const list = listFriend.map(async (value) => {
        const result = await findUserAndKeyByUid(value.val.uid);
        return result;
    });

    return Promise.all(list);
};

export const getAllListMessage = async (uid) => {
    const listMessage = await findAllChildOfSpecialCollect(
        "users",
        "uid",
        uid,
        "listMessage"
    );
    return listMessage;
};

export const getAllGroup = async (uid) => {
    const listMessage = await findAllChildOfSpecialCollect(
        "users",
        "uid",
        uid,
        "listMessage"
    );
    const result = listMessage.filter((value) => value.val.type === 2);
    const list = result.map(async (value) => {
        const result = await findMessageByKey(value.val.messageId);
        return result;
    });
    return Promise.all(list);
};

export const findMessageByKey = async (key) => {
    const result = await findAllChildOfRecord("messages", key);
    if (result) return result;
    return null;
};
