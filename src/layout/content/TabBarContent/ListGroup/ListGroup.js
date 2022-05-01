import React from "react";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    Badge,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import "./ListGroup.css";
import { Avatar } from "components";
function ListGroup() {
    return (
        <div className="pt-4 px-3">
            <Row>
                <Col>
                    <h4 className="mb-4">Groups</h4>
                </Col>
                <Col>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Create Group</Tooltip>}
                    >
                        <i className="bi bi-people-fill float-end me-4 cur-pointer"></i>
                    </OverlayTrigger>
                </Col>
            </Row>
            <InputGroup className="mb-5 rounded-3">
                <InputGroup.Text
                    className="bg-light ps-3 pe-1 text-muted-bg border-0"
                    id="basic-addon1"
                >
                    <i
                        className="bi bi-search cur-pointer"
                        style={{ lineHeight: 2 }}
                    ></i>
                </InputGroup.Text>
                <FormControl
                    className="bg-light border-0 seach__text-color"
                    placeholder="Search Groups..."
                    aria-label="Search Groups..."
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <div className="p-2 d-flex cur-pointer listChatContent__child">
                <Col lg={2} xs={2} className="align-self-center">
                    <Avatar width="80%" />
                </Col>
                <Col lg={8} xs={8} className="align-self-center flex-grow-1">
                    <h5 className="fz-15 ps-2 text-truncate">
                        Trần Nhất Quang
                    </h5>
                </Col>
                <Col lg="auto" xs="auto" className="align-self-center">
                    <Badge className="float-end" pill bg="danger">
                        9+
                    </Badge>
                </Col>
            </div>
        </div>
    );
}

export default ListGroup;