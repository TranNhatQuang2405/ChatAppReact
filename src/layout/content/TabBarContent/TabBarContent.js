import React from "react";
import ListChat from "./ListChat";
import { Col } from "react-bootstrap";
function TabBarContent() {
    return (
        <Col
            xs={12}
            lg={4}
            style={{
                height: "100vh",
                backgroundColor: "var(--bs-sidebar-sub-bg)",
            }}
        >
            <ListChat />
        </Col>
    );
}

export default TabBarContent;