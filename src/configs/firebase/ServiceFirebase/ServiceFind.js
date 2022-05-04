import { findRecordString, findAll } from "./service";

export const findFriendToInvite = async (searchInvite, uid) => {
    const listFriend = await findRecordString(
        "users",
        "displayName",
        searchInvite
    );
    const listCurrentFriend = await findAll("user", "listFriend");
    const listUid = listCurrentFriend.map((value) => value.val.uid);
    const result = listFriend.filter((friend) => {
        if (friend.val.uid !== uid && listUid.indexOf(friend.val.uid) === -1)
            return true;
        return false;
    });
    return result;
};