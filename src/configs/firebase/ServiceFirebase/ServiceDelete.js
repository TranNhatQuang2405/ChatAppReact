import { deleteRecord, findExactRecord } from "./service";

export const deleteInvite = async (KeyId, friendUid, currentUserId) => {
    await deleteRecord(`users/${KeyId}/listInvite`, "uid", currentUserId);
    console.log(currentUserId);
    const value = await findExactRecord("users", "uid", currentUserId);
    if (value && Array.isArray(value))
        await deleteRecord(`users/${value[0].key}/listWait`, "uid", friendUid);
};