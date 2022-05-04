import React from "react";
import { Col } from "react-bootstrap";
import Avatar from "components/Avatar";
import useIsOnline from "configs/customHook/useIsOnline";
import { show } from "configs/redux/Slice/ShowMessageSlice";
import { GetCurrentMessage } from "configs/redux/Slice/CurrentMessageSlide";
import { useDispatch } from "react-redux";
function StatusItem(props) {
    const { keyId, friend } = props;
    const [isOnline] = useIsOnline(keyId);
    const dispatch = useDispatch();
    const handleShow = () => {
        dispatch(
            GetCurrentMessage({
                key: null,
                typeMessage: 1,
                friend: friend,
            })
        );
        dispatch(show());
    };

    if (friend)
        return (
            <Col
                className="text-center"
                style={{
                    textAlign: "center",
                }}
                onClick={handleShow}
            >
                <Avatar
                    width="3.3rem"
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