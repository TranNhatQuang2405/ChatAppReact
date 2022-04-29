import React, { useState, useEffect } from "react";
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
            AddFriend(uid, currentUser.uid)
                .then(() => {})
                .catch((e) => {
                    console.log(e);
                    setAction(false);
                });
        }
    };

    const handleDeny = async () => {
        if (action === false) {
            setAction("pending");
            try {
                await denyFriend(uid, currentUser.uid);
            } catch (e) {
                console.log(e);
                setAction(false);
            }
        }
    };

    // useEffect(() => {
    //     let isMounted = true;
    //     const handleLoad = async () => {
    //         const friend = await findUserByUid(uid);
    //         if (isMounted) setFriendWait(friend);
    //     };
    //     if (uid) handleLoad();
    //     return () => {
    //         isMounted = false;
    //     };
    // }, []);

    if (friendWait)
        return (
            <div className="CardAccept__body">
                <div className="CardAccept__Image">
                    <Avatar
                        width="3rem"
                        url={friendWait?.photoURL ? friendWait.photoURL : User}
                    />
                </div>
                <div className="CardAccept__Name">{friendWait.displayName}</div>
                {action === false ? (
                    <>
                        <div className="CardAccept__btn" onClick={handleAccept}>
                            <i className="bi bi-check-circle-fill"></i>
                        </div>
                        <div className="CardAccept__btn" onClick={handleDeny}>
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
            </div>
        );
    return <div onClick={handleAccept}>Pending</div>;
}

export default React.memo(CardAccept);
