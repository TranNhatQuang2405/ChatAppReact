export const validatTextAndNum = (text) => {
    const regex = /^[A-Za-z0-9]+$/;
    if (!regex.test(text)) return false;
    else return true;
};

export const validateUTF8Name = (text) => {
    var regex = /[\s\p{Alpha}\p{M}-]+/gu;
    const check = regex.exec(text);
    if (check && check[0] === text) return true;
    else return false;
};
