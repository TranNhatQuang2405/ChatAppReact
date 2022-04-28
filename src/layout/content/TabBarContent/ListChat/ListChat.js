import React from "react";
import { Search, Status, ListChatContent } from "./Component";

function ListChat() {
    return (
        <div className="vh-100 position-relative d-flex flex-column align-items-stretch">
            <Search />
            <Status />
            <ListChatContent />
        </div>
    );
}
export default ListChat;
