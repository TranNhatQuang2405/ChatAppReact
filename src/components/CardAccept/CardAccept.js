import React, { useState, useLayoutEffect } from "react";
import { Avatar } from "components";
import { findUserByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import { AddFriend } from "configs/firebase/ServiceFirebase/ServiceInsert";
import { denyFriend } from "configs/firebase/ServiceFirebase/ServiceDelete";
import { useSelector } from "react-redux";

import User from "image/user.png";
import "./cardAccept.css";

function CardAccept(props) {
    const { uid } = props;
    const [action, setAction] = useState(false);
    const currentUser = useSelector((state) => state.UserInfo.user);
    const [friendWait, setFriendWait] = useState(null);
    const handleAccept = async () => {
        if (action === false) {
            setAction("pending");
            await AddFriend(uid, currentUser.uid)
                .then(() => {
                    setAction(true);
                })
                .catch((e) => {
                    console.log(e);
                    setAction(false);
                });
        }
    };
    const handleDeny = async () => {
        if (action === false) {
            setAction("pending");
            await denyFriend(uid, currentUser.uid)
                .then(() => {
                    setAction(true);
                })
                .catch((e) => {
                    console.log(e);
                    setAction(false);
                });
        }
    };

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
                    {action === false ? (
                        <>
                            <div
                                className="CardAccept__btn"
                                onClick={handleAccept}
                            >
                                <i className="bi bi-check-circle-fill"></i>
                            </div>
                            <div
                                className="CardAccept__btn"
                                onClick={handleDeny}
                            >
                                <i className="bi bi-x-circle-fill"></i>
                            </div>
                        </>
                    ) : action === "pending" ? (
                        <div className="rotate CardAccept__btn-pending">
                            <i className="bi bi-arrow-repeat "></i>
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
}

export default CardAccept;
