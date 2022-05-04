import React, { useState, useLayoutEffect } from "react";
import { Avatar } from "components";
import User from "image/user.png";
import { findUserByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import "./CardAccept.css";

function CardAccept(props) {
    const { keyId, uid } = props;

    const [friendWait, setFriendWait] = useState(null);
    const handleAccept = () => {};
    const handleDeny = () => {};

    useLayoutEffect(() => {
        let isMounted = true;
        const handleLoad = async () => {
            const friend = await findUserByUid(uid);
            if (isMounted) setFriendWait(friend);
        };
        handleLoad();
        return () => {
            isMounted = false;
        };
    }, [uid]);

    return (
        <div className="CardAccept__body">
            {friendWait && (
                <>
                    <div className="CardAccept__Image">
                        <Avatar
                            width="3rem"
                            url={
                                friendWait?.photoURL
                                    ? friendWait.photoURL
                                    : User
                            }
                        />
                    </div>
                    <div className="CardAccept__Name">
                        {friendWait.displayName}
                    </div>
                    <div className="CardAccept__btn" onClick={handleAccept}>
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <div className="CardAccept__btn" onClick={handleDeny}>
                        <i className="bi bi-x-circle-fill"></i>
                    </div>
                </>
            )}
        </div>
    );
}

export default CardAccept;