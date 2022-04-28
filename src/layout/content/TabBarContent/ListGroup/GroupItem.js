import React from "react";
import { Avatar } from "components";
import { Col, Badge } from "react-bootstrap";

function GroupItem(props) {
    const { keyId, val } = props;
    return (
        <div className="p-2 d-flex cur-pointer listChatContent__child">
            <Col lg={2} xs={2} className="align-self-center">
                <Avatar width="80%" url={val.photoURL} />
            </Col>
            <Col lg={8} xs={8} className="align-self-center flex-grow-1">
                <h5 className="fz-15 ps-2 text-truncate">{val.name}</h5>
            </Col>
            <Col lg="auto" xs="auto" className="align-self-center">
                <Badge className="float-end" pill bg="danger">
                    9+
                </Badge>
            </Col>
        </div>
    );
}

export default React.memo(GroupItem);
