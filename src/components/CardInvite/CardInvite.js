import React, { useState } from "react";
import Avatar from "components/Avatar";
import User from "image/user.png";
import "./CardInvite.css";
function CardInvite(props) {
    const [invite, setInvite] = useState(false);

    const handleInvite = async () => {
        if (invite === false) {
            setInvite("pending");
            setTimeout(() => setInvite(true), 2000);
        } else if (invite === true) {
            setInvite("pending");
            setTimeout(() => setInvite(false), 2000);
        }
    };

    const { keyId, value } = props;
    return (
        <div className="CardInvite__body">
            <div className="CardInvite__Image">
                <Avatar
                    width="3rem"
                    url={value?.photoURL ? value.photoURL : User}
                />
            </div>
            <div className="CardInvite__Name">{value.displayName}</div>
            <div className="CardInvite__btn" onClick={handleInvite}>
                {invite === false ? (
                    <i className="bi bi-plus-circle"></i>
                ) : invite === "pending" ? (
                    <div className="rotate CardInvite__btn-border">
                        <i className="bi bi-arrow-repeat "></i>
                    </div>
                ) : (
                    <i className="bi bi-check-lg"></i>
                )}
            </div>
        </div>
    );
}

export default CardInvite;