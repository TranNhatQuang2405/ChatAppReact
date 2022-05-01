import React from "react";
import { Col } from "react-bootstrap";
import Avatar from "components/Avatar";
function StatusItem() {
    return (
        <Col
            className="text-center"
            style={{
                textAlign: "center",
            }}
        >
            <Avatar width="80%" status={false} />
            <h5 style={{ fontSize: 13 }} className="mb-1 mt-2 text-truncate">
                Emily
            </h5>
        </Col>
    );
}

export default StatusItem;