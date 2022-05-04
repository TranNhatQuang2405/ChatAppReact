import React, { useState, useEffect } from "react";
import { Avatar } from "components";
import { Spinner } from "react-bootstrap";
import { findUserAndKeyByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import "./CardMember.css";
function CardMember({ uid }) {
    const [member, setMember] = useState(null);
    useEffect(() => {
        let unmounted = true;
        const fetch = async () => {
            const re = await findUserAndKeyByUid(uid);
            if (unmounted) setMember(re);
        };
        fetch();
        return () => {
            unmounted = true;
        };
    }, [uid]);
    if (member)
        return (
            <div className="CardMember__body">
                <div className="CardMember__Image">
                    <Avatar width="2rem" url={member.val.photoURL} />
                </div>
                <div className="CardMember__Name">{member.val.displayName}</div>
            </div>
        );
    else return <Spinner />;
}

export default React.memo(CardMember);