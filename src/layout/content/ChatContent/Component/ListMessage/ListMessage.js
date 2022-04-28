import React from "react";
import Message from "../Message/Message";
import "./listMessage.css";
function ListMessage() {
    const list = [false, false, false, false, false, true];
    list.reverse();
    return (
        <div className="ListMessage__parent">
            <div className="ListMessage__listChild fix_scroll">
                {list.map((value, index) => (
                    <Message showSend={value} key={index} />
                ))}
            </div>
        </div>
    );
}

export default ListMessage;
