import React, { useState } from "react";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    Badge,
    OverlayTrigger,
    Tooltip,
    Modal,
    Form,
    Button,
} from "react-bootstrap";
import "./ListGroup.css";
import { Avatar } from "components";
import { useSelector } from "react-redux";

function ListGroup() {
    const [show, setShow] = useState(false);
    const localTheme = useSelector((state) => state.LocalTheme.theme);

    return (
        <div className="pt-4 px-3 ListGroup__Parent">
            <Row>
                <Col>
                    <h4 className="mb-4">Groups</h4>
                </Col>
                <Col>
                    <Modal
                        show={show}
                        centered
                        onHide={() => setShow(false)}
                        data-layout-mode={localTheme}
                    >
                        <Modal.Header closeButton className="modal__bg-fix">
                            <h5>Create Group</h5>
                        </Modal.Header>
                        <Modal.Body className="modal__bg-fix">
                            <div className="mb-4">
                                <Form.Label htmlFor="group_name">
                                    Group Name
                                </Form.Label>
                                <InputGroup className="mb-4 rounded-3">
                                    <FormControl
                                        className="bg-light border-0 seach__text-color lh-2"
                                        placeholder="Set name for group"
                                    />
                                </InputGroup>
                            </div>
                            <div className="mb-4">
                                <Form.Label htmlFor="group_name">
                                    Description
                                </Form.Label>
                                <InputGroup className="mb-4 rounded-3">
                                    <FormControl
                                        as="textarea"
                                        className="bg-light border-0 seach__text-color lh-2"
                                        placeholder="Description..."
                                    />
                                </InputGroup>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="modal__bg-fix">
                            <Button
                                bsPrefix="btn_color"
                                onClick={() => setShow(false)}
                            >
                                Close
                            </Button>
                            <Button bsPrefix="btn_color">Create Group</Button>
                        </Modal.Footer>
                    </Modal>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Create Group</Tooltip>}
                    >
                        <i
                            className="bi bi-people-fill float-end me-2 cur-pointer"
                            onClick={() => setShow(true)}
                        ></i>
                    </OverlayTrigger>
                </Col>
            </Row>
            <InputGroup className="mb-4 rounded-3">
                <InputGroup.Text
                    className="bg-light ps-3 pe-1 text-muted-bg border-0"
                    id="basic-addon1"
                >
                    <i className="bi bi-search cur-pointer lh-2"></i>
                </InputGroup.Text>
                <FormControl
                    className="bg-light border-0 seach__text-color"
                    placeholder="Search Groups..."
                    aria-label="Search Groups..."
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <div className="ListGroup__Child">
                <div className="ListGroup__NodeChild fix_scroll">
                    <div className="p-2 d-flex cur-pointer listChatContent__child">
                        <Col lg={2} xs={2} className="align-self-center">
                            <Avatar width="80%" />
                        </Col>
                        <Col
                            lg={8}
                            xs={8}
                            className="align-self-center flex-grow-1"
                        >
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
                    <div className="p-2 d-flex cur-pointer listChatContent__child">
                        <Col lg={2} xs={2} className="align-self-center">
                            <Avatar width="80%" />
                        </Col>
                        <Col
                            lg={8}
                            xs={8}
                            className="align-self-center flex-grow-1"
                        >
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
            </div>
        </div>
    );
}

export default ListGroup;