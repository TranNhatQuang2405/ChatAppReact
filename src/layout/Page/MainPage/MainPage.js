import React from "react";
import { Body, TabBar } from "components";
import { ChatContent } from "layout/content/";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function MainPage() {
    const currentUser = useSelector((state) => state.UserInfo.user);

    if (currentUser !== null)
        return (
            <Body>
                <TabBar />
                <ChatContent />
            </Body>
        );
    else return <Navigate to="/Login" />;
}

export default React.memo(MainPage);
