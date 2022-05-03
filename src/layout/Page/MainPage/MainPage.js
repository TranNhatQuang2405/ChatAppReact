import React from "react";
import { Body, TabBar } from "components";
import { ChatContent } from "layout/content/";
function MainPage() {
    return (
        <Body>
            <TabBar />
            <ChatContent />
        </Body>
    );
}

export default MainPage;