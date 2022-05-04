import React from "react";
import { ref, onValue, query, get } from "firebase/database";
import { db } from "configs/firebase/config";
const sortTime = (a, b) => {
    if (a.createdAt > b.createdAt) return 1;
    else if (a.createdAt < b.createdAt) return -1;
    else return 0;
};

const useInfoMessage = (key, uid) => {
    const [info, setInfo] = React.useState({ key: key });
    React.useEffect(() => {
        let dbRef = query(ref(db, `messages/${key}`));
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                console.log("UseInfo: ", snapshot.exists());
                if (snapshot.exists()) {
                    var val = snapshot.val();
                    var listChildMessage = val.listChildMessage;
                    var NewMessage = 0;
                    var LastMessage = "";
                    var type = val.type;
                    var photoURL = val.photoURL;
                    var name = val.name;
                    var timeUpdate = val.timeUpdate;
                    var date = new Date(timeUpdate);
                    var isOnline = true;
                    var time = date.toLocaleTimeString("en-US", {
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric",
                    });
                    if (
                        date.toLocaleDateString() !==
                        new Date().toLocaleDateString()
                    ) {
                        time = date.toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                        });
                    }
                    if (type === 1) {
                    }
                    if (listChildMessage) {
                        listChildMessage.sort(sortTime);
                        for (var i = 0; i < 10; i++) {
                            if (
                                listChildMessage[i].listRead.indexOf(uid) === -1
                            ) {
                                NewMessage++;
                            }
                        }
                        LastMessage = listChildMessage[0];
                    }
                    setInfo((prev) => ({
                        ...prev,
                        NewMessage: NewMessage,
                        LastMessage: LastMessage,
                        photoURL: photoURL,
                        name: name,
                        time: time,
                        timeUpdate: timeUpdate,
                        key: snapshot.key,
                        isOnline: isOnline,
                    }));
                } else {
                    get(dbRef).then((snapshot) => {
                        if (!snapshot.exists()) {
                        }
                    });
                }
            },
            {
                onlyOnce: false,
            }
        );

        return unsubscribe;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);
    return [info];
};

export default useInfoMessage;