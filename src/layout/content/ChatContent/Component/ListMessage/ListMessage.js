import React from "react";
import Message from "../Message/Message";
import "./ListMessage.css";
function ListMessage() {
    return (
        <div className="ListMessage__parent">
            <div className="ListMessage__listChild fix_scroll">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message showSend={true} />
            </div>
        </div>
    );
}

export default ListMessage;