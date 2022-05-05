import React, { useEffect } from "react";
import { Avatar } from "components";
import { Col, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { show } from "configs/redux/Slice/ShowMessageSlice";
import useInfoMessage from "configs/customHook/useInfoMessage";
import { updateTime } from "configs/redux/Slice/ListMessageSlice";
import { GetCurrentMessage } from "configs/redux/Slice/CurrentMessageSlide";
import useIsOnline from "configs/customHook/useIsOnline";

function ListChatItem(props) {
    const { keyId, type } = props;
    const currentUser = useSelector((state) => state.UserInfo.user);
    const dispatch = useDispatch();
    const [info] = useInfoMessage(keyId, currentUser.uid);
    const [IsOnline] = useIsOnline(info && info.friendKey);
    const handleShow = () => {
        dispatch(
            GetCurrentMessage({
                key: keyId,
                typeMessage: type,
                friend: info.friend,
                keyUid: currentUser.key,
            })
        );
        dispatch(show());
    };
    useEffect(() => {
        dispatch(updateTime({ key: info.key, timeUpdate: info.timeUpdate }));
        return () => {};
    }, [dispatch, info]);
    if (type === 1)
        return (
            <div
                onClick={handleShow}
                className="p-2 d-flex cur-pointer listChatContent__child"
            >
                <Col lg={2} xs={2} className="align-self-center">
                    <Avatar width="85%" status={IsOnline} url={info.photoURL} />
                </Col>
                <Col lg={8} xs={8} className="align-self-center flex-grow-1">
                    <h5 className="fz-15 ps-2 text-truncate">{info.name}</h5>
                    <p className="fz-14 m-0 mt-1 ps-2 listChatContent__text-color text-truncate">
                        {info.LastMessage}
                    </p>
                </Col>
                <Col lg="auto" xs="auto" className="align-self-baseline">
                    <div className="fz-12 listChatContent__text-color">
                        {info.time}
                    </div>
                    {info.NewMessage > 0 && (
                        <Badge className="float-end mt-2" pill bg="danger">
                            {info.NewMessage}
                        </Badge>
                    )}
                </Col>
            </div>
        );
    else
        return (
            <div
                className="p-2 d-flex cur-pointer listChatContent__child"
                onClick={handleShow}
            >
                <Col lg={2} xs={2} className="align-self-center">
                    <Avatar
                        width="80%"
                        status={info.isOnline}
                        url={info.photoURL}
                    />
                </Col>
                <Col lg={8} xs={8} className="align-self-center flex-grow-1">
                    <h5 className="fz-15 ps-2 text-truncate">{info.name}</h5>
                    <p className="fz-14 m-0 mt-1 ps-2 listChatContent__text-color text-truncate">
                        {info.LastMessage}
                    </p>
                </Col>
                <Col lg="auto" xs="auto" className="align-self-baseline">
                    <div className="fz-12 listChatContent__text-color">
                        {info.time}
                    </div>
                    {info.NewMessage > 0 && (
                        <Badge className="float-end mt-2" pill bg="danger">
                            {info.NewMessage}
                        </Badge>
                    )}
                </Col>
            </div>
        );
}

export default ListChatItem;