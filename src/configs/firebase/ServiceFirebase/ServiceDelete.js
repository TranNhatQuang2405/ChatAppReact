import { deleteRecord, findExactRecord } from "./service";

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
