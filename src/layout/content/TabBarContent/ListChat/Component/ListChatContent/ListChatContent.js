import React from "react";
import "./listChatContent.css";
import { Avatar } from "components";
import { Col } from "react-bootstrap";
function ListChatContent() {
    return (
        <div className="pt-3 px-3">
            <h5 className="fz-16 pb-3">Recent</h5>
            <div className="d-flex">
                <Col lg={2} xs={2} className="align-self-center">
                    <Avatar width="85%" status={true} />
                </Col>
                <Col lg={8} xs={8} className="align-self-center flex-grow-1">
                    <h5 className="fz-15 ps-2 text-truncate">
                        Trần Nhất Quang
                    </h5>
                    <p className="fz-14 m-0 mt-1 ps-2 listChatContent__text-color text-truncate">
                        Làm vậy được không Phát cu te phô mai que
                    </p>
                </Col>
                <Col lg="auto" xs="auto" className="align-self-baseline">
                    <div className="fz-11 listChatContent__text-color">
                        11:00 AM
                    </div>
                </Col>
            </div>
        </div>
    );
}

export default ListChatContent;
