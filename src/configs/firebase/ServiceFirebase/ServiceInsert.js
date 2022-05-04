import { addRecord, findExactRecord, deleteRecord } from "./service";

export const addUser = async (user, _tokenResponse) => {
    await addRecord("users/", {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        listFriend: null,
        listGroup: null,
        listChat: null,
        listInvite: null,
        IsOnline: true,
        providerId: _tokenResponse.providerId,
    });
};

export const inviteFriend = async (KeyId, friendUid, currentUserId) => {
    await addRecord(`users/${KeyId}/listInvite`, {
        uid: currentUserId,
    });
    const value = await findExactRecord("users", "uid", currentUserId);
    if (value && Array.isArray(value))
        await addRecord(`users/${value[0].key}/listWait`, {
            uid: KeyId,
            uid: friendUid,
        });
};

export const AddFriend = async (friendUid, currentUserId) => {
    const friend = await findExactRecord("users", "uid", friendUid);
    const value = await findExactRecord("users", "uid", currentUserId);
    if (value && friend && Array.isArray(value) && Array.isArray(friend)) {
        await addRecord(`users/${value[0].key}/listFriend`, {
            uid: friendUid,
        });
        await addRecord(`users/${friend[0].key}/listFriend`, {
            uid: currentUserId,
        });
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