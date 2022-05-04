import { addRecord, findExactRecord } from "./service";

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

export const inviteFriend = async (KeyId, currentUserId) => {
    await addRecord(`users/${KeyId}/listInvite`, {
        uid: currentUserId,
    });
    const value = await findExactRecord("users", "uid", currentUserId);
    console.log(value[0].key);
    if (value && Array.isArray(value))
        await addRecord(`users/${value[0].key}/listWait`, {
            uid: KeyId,
        });
};

export const unInviteFriend = async (userId, currentUserId) => {
    // const key = await findExactRecord("users", "uid", userId);
    // await addRecord(`user/${key[0]}/listInvite`, {
    //     uid: currentUserId,
    // });
};

export const AddFriend = async (userId, currentUserId) => {};