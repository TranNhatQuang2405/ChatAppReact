import { updateRecord } from "./service";

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
