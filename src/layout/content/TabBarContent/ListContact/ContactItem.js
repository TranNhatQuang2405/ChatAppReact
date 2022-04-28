import React from "react";
import { Avatar } from "components";
import { Dropdown, Col } from "react-bootstrap";
import { deleteFriend } from "configs/firebase/ServiceFirebase/ServiceDelete";
import { useSelector } from "react-redux";
function ContactItem(props) {
    const { friend } = props;
    const currentUser = useSelector((state) => state.UserInfo.user);

    const handleDelete = async () => {
        await deleteFriend(friend.uid, currentUser.uid);
    };
    if (friend)
        return (
            <div className="p-2 d-flex cur-pointer listChatContent__child">
                <Col lg={2} xs={2} className="align-self-center">
                    <Avatar
                        width="70%"
                        url={(friend?.photoURL && friend.photoURL) || null}
                    />
                </Col>
                <Col lg={8} xs={8} className="align-self-center flex-grow-1">
                    <h5 className="fz-15 text-truncate">
                        {friend.displayName}
                    </h5>
                </Col>
                <Col lg="auto" xs="auto" className="align-self-center">
                    <Dropdown>
                        <Dropdown.Toggle
                            as="div"
                            bsPrefix="listContact__dropdownToggle"
                        >
                            <i className="bi bi-three-dots-vertical"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end" className="text-muted">
                            <Dropdown.Item className="listContact__dropdownItem">
                                Share
                                <i className="bi bi-share float-end text-muted"></i>
                            </Dropdown.Item>
                            <Dropdown.Item
                                className="listContact__dropdownItem"
                                onClick={handleDelete}
                            >
                                Remove
                                <i className="bi bi-trash3-fill float-end text-muted"></i>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </div>
        );
    else return <></>;
}

export default React.memo(ContactItem);
