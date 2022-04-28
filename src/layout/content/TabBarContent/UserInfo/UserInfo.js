import React, { memo } from "react";
import { Avatar } from "components";
import { Accordion } from "react-bootstrap";
import { useSelector } from "react-redux";
function UserInfo() {
    const currentUser = useSelector((state) => state.UserInfo.user);

    return (
        <div>
            <div className="ChatContent__userInfo-avatar">
                <Avatar width="5rem" url={currentUser.photoURL} />
                <div>{currentUser.displayName}</div>
            </div>
            <div className="ChatContent__userInfo-body fix_scroll p-4">
                <Accordion defaultActiveKey="0">
                    <Accordion.Item
                        className="userInfo__AccordionItem"
                        eventKey="0"
                    >
                        <Accordion.Header className="header__AccordionItem">
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
                                        {currentUser.displayName}
                                    </h6>
                                </div>
                                <div className="mt-4">
                                    <p className="text-muted mb-1">Email</p>
                                    <h6 className="font-size-14">
                                        {currentUser.email}
                                    </h6>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                        className="userInfo__AccordionItem"
                        eventKey="1"
                    >
                        <Accordion.Header className="header__AccordionItem">
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
