import { storage } from "configs/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
const imageRef = ref(storage, "images");
// const videoRef = ref(storage, "videos");

export const uploadImage = async (file) => {
    var childRef = ref(
        imageRef,
        `${Date.now()}${Math.floor(Math.random() * 10000)}${Math.floor(
            Math.random() * 10000
        )}${Math.floor(Math.random() * 10000)}${Math.floor(
            Math.random() * 10000
        )}${Math.floor(Math.random() * 10000)}${Math.floor(
            Math.random() * 10000
        )}`
    );

    var result = "";

    try {
        const snapshot = await uploadBytes(childRef, file);
        result = await getDownloadURL(snapshot.ref);
        return result;
    } catch (e) {
        console.log(e);
        return "";
    }
};
