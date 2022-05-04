import React, { useState } from "react";
import { Avatar } from "components";
import { AddFriend } from "configs/firebase/ServiceFirebase/ServiceInsert";
import { denyFriend } from "configs/firebase/ServiceFirebase/ServiceDelete";
import { useSelector } from "react-redux";

import User from "image/user.png";
import "./CardAccept.css";

function CardAccept(props) {
    const { friendWait } = props;
    const [action, setAction] = useState(false);
    const currentUser = useSelector((state) => state.UserInfo.user);

    const handleAccept = async () => {
        if (action === false) {
            AddFriend(friendWait.uid, currentUser.uid)
                .then(() => {})
                .catch((e) => {
                    console.log(e);
                    setAction(false);
                });
        }
    };

    const handleDeny = async () => {
        if (action === false) {
            try {
                await denyFriend(friendWait.uid, currentUser.uid);
            } catch (e) {
                console.log(e);
                setAction(false);
            }
        }
    };

    return (
        <>
            {friendWait && (
                <div className="CardAccept__body">
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
                </div>
            )}
        </>
    );
}

export default React.memo(CardAccept);