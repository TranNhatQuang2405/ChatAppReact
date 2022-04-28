import React from "react";
import { ref, onValue } from "firebase/database";
import { findUserKeyByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import { db } from "configs/firebase/config";

const useIsOnline = (uid) => {
    const [key, setKey] = React.useState(null);
    const [isOnline, setIsOnline] = React.useState(false);

    React.useEffect(() => {
        let isMounted = true;
        const handleLoad = async () => {
            const friend = await findUserKeyByUid(uid);
            if (isMounted) setKey(friend);
        };
        if (uid) handleLoad();
        return () => {
            isMounted = false;
        };
    }, [uid]);

    React.useEffect(() => {
        let dbRef = ref(db, `users/${key}/IsOnline`);
        const unsubscribe = onValue(
            dbRef,
            (snapshot) => {
                setIsOnline(snapshot.val() || false);
            },
            {
                onlyOnce: false,
            }
        );
        return unsubscribe;
    }, [key]);
    return [isOnline];
};

export default useIsOnline;
