import React, { memo } from "react";
import { Avatar } from "components";
import { Accordion } from "react-bootstrap";
function UserInfo({ showInfo, setShowInfo }) {
    return (
        <div className={`ChatContent__userInfo ${showInfo ? "show" : ""}`}>
            <div
                className="ChatContent__userInfo-buttonClose"
                onClick={() => setShowInfo(false)}
            >
                <i className="bi bi-x-circle-fill"></i>
            </div>
            <div className="ChatContent__userInfo-avatar">
                <Avatar width="5rem" />
                <div>Trần Nhất Quang</div>
            </div>
            <div className="ChatContent__userInfo-body  fix_scroll p-4">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item
                        className="userInfo__AccordionItem"
                        eventKey="0"
                    >
                        <Accordion.Header>
                            <h6>
                                <i className="bi bi-person-lines-fill pe-2 fz-20"></i>
                                About
                            </h6>
                        </Accordion.Header>
                        <Accordion.Body>
                            <div className="accordion-body">
                                <div>
                                    <p className="text-muted mb-1">Name</p>
                                    <h6 className="font-size-14">
                                        Doris Brown
                                    </h6>
                                </div>
                                <div className="mt-4">
                                    <p className="text-muted mb-1">Email</p>
                                    <h6 className="font-size-14">
                                        adc@123.com
                                    </h6>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        className="userInfo__AccordionItem"
                        eventKey="1"
                    >
                        <Accordion.Header>
                            <h6>
                                <i className="bi bi-paperclip pe-2 fz-20"></i>
                                Attached Files
                            </h6>
                        </Accordion.Header>
                        <Accordion.Body></Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
}

export default memo(UserInfo);