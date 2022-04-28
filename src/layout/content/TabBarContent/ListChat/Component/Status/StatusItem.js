import React from "react";
import { Col } from "react-bootstrap";
import Avatar from "components/Avatar";
import useIsOnline from "configs/customHook/useIsOnline";
function StatusItem(props) {
    const { friend } = props;
    const [isOnline] = useIsOnline(friend.uid);

    if (friend)
        return (
            <Col
                className="text-center"
                style={{
                    textAlign: "center",
                }}
            >
                <Avatar
                    width="80%"
                    url={friend?.photoURL && friend.photoURL}
                    status={isOnline}
                />
                <h5
                    style={{ fontSize: 13 }}
                    className="mb-1 mt-2 text-truncate"
                >
                    {friend.displayName}
                </h5>
            </Col>
        );
    else return <></>;
}

export default StatusItem;
