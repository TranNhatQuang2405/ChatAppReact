import { Avatar } from "components";
import React from "react";
import Message from "../Message/Message";
import "./ListMessage.css";
function ListMessage() {
    return (
        <div className="ListMessage__parent">
            <div className="ListMessage__listChild fix_scroll">
                <Avatar />
                <Avatar />
            </div>
        </div>
    );
}

export default ListMessage;