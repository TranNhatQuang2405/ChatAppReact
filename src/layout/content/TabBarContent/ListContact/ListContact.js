import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    OverlayTrigger,
    Tooltip,
    Modal,
    Badge,
} from "react-bootstrap";
import { CardInvite, CardAccept } from "components";
import { useSelector, useDispatch } from "react-redux";
import { validateUTF8Name } from "configs/Validate";
import { findFriendToInvite } from "configs/firebase/ServiceFirebase/ServiceFind";
import { GetAll } from "configs/redux/Slice/ListFriendWaitSlice";
import useListFriend from "configs/customHook/useListFriend";
import ContactItem from "./ContactItem";
import { findUserByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import "./ListContact.css";
import useFriendRequest from "configs/customHook/useFriendRequest";

function ListContact() {
    const dispatch = useDispatch();
    const localTheme = useSelector((state) => state.LocalTheme.theme);
    const currentUser = useSelector((state) => state.UserInfo.user);
    const listFriendWait = useSelector((state) => state.ListFriendWait);
    const listFriend = useSelector((state) => state.AllFriend.listFriend);
    const [listFriendInfo, setListFriendInfo] = useState([]);
    const [show, setShow] = useState(false);
    const [showRequset, setShowRequset] = useState(false);
    const [searchInvite, setSearchInvite] = useState("");
    const [listToInvite, setListToInvite] = useState([]);
    useListFriend(currentUser.uid);
    useFriendRequest(currentUser.uid);

    const filterListFriend = (val) => {
        const tmp = listFriendInfo.filter((value) => {
            return value.uid === val.uid;
        });
        if (tmp.length > 0) return false;
        else return true;
    };

    const sortName = (a, b) => {
        if (a.displayName < b.displayName) {
            return -1;
        }
        if (a.displayName > b.displayName) {
            return 1;
        }
        return 0;
    };

    React.useEffect(() => {
        let isMounted = true;
        const handleLoad = async () => {
            listFriend.forEach(async (uid) => {
                const get = await findUserByUid(uid);
                if (isMounted)
                    if (filterListFriend(get))
                        setListFriendInfo((prev) => [...prev, get]);
            });
        };
        if (listFriend) handleLoad();
        return () => {
            isMounted = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listFriend]);

    const handleChangeSearchInvite = (e) => {
        setSearchInvite(e.target.value);
    };

    useEffect(() => {
        let isMounted = true;
        const handleGetData = async () => {
            if (isMounted) {
                dispatch(GetAll(currentUser.uid));
            }
        };
        handleGetData();
        return () => {
            isMounted = false;
        };
    }, [currentUser.uid, dispatch]);

    useEffect(() => {
        const GetResult = async () => {
            if (searchInvite && validateUTF8Name(searchInvite)) {
                const result = await findFriendToInvite(
                    searchInvite,
                    currentUser.uid
                );
                setListToInvite(result);
            } else {
                setListToInvite([]);
            }
        };
        GetResult();
    }, [currentUser.uid, searchInvite]);

    return (
        <div className="pt-4 px-3 ListContact__Parent">
            <Row>
                <Col>
                    <h4 className="mb-4">Contacts</h4>
                </Col>
                <Col>
                    {/* Show add contact */}
                    <Modal
                        show={show}
                        centered
                        onHide={() => {
                            setShow(false);
                            setSearchInvite("");
                        }}
                        data-layout-mode={localTheme}
                    >
                        <Modal.Header closeButton className="modal__bg-fix">
                            <h5>Add contact</h5>
                        </Modal.Header>
                        <Modal.Body className="modal__bg-fix">
                            <InputGroup className="mb-4 rounded-3">
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
                                    onChange={handleChangeSearchInvite}
                                    className="bg-light border-0 seach__text-color"
                                    placeholder="Search users..."
                                    aria-label="Search users..."
                                    aria-describedby="basic-addon1"
                                    value={searchInvite}
                                />
                            </InputGroup>
                            <h6>List contact</h6>
                            {listToInvite.map((value) => (
                                <CardInvite
                                    key={value.key}
                                    keyId={value.key}
                                    value={value.val}
                                />
                            ))}
                        </Modal.Body>
                    </Modal>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Add Contact</Tooltip>}
                    >
                        <i
                            className="bi bi-person-plus-fill fz-20 float-end me-2 cur-pointer"
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
                    placeholder="Search users..."
                    aria-label="Search users..."
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            {/* Show friend invite */}
            <Modal
                show={showRequset}
                centered
                onShow={() => dispatch(GetAll(currentUser.uid))}
                onHide={() => {
                    setShowRequset(false);
                }}
                data-layout-mode={localTheme}
            >
                <Modal.Header closeButton className="modal__bg-fix">
                    <h5>Friend Request</h5>
                </Modal.Header>
                <Modal.Body className="modal__bg-fix">
                    <InputGroup className="mb-4 rounded-3">
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
                            placeholder="Search users..."
                            aria-label="Search users..."
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <h6>List request</h6>
                    {!listFriendWait.pending &&
                        listFriendWait.listUser &&
                        listFriendWait.listUser.map((value) => (
                            <CardAccept key={value.key} uid={value.val.uid} />
                        ))}
                </Modal.Body>
            </Modal>
            <h6
                className="friend_request_parent"
                onClick={() => setShowRequset(true)}
            >
                <div className="friend_request_parent-image">
                    <i className="bi bi-envelope-plus-fill"></i>
                </div>
                <div className="friend_request_parent-length">
                    <Badge
                        className="friend_request_parent-lengthContent"
                        bg="danger"
                    >
                        {listFriendWait &&
                            listFriendWait?.listUser &&
                            listFriendWait.listUser.length}
                    </Badge>
                </div>
            </h6>

            <div className="ListContact__Child">
                <div className="ListContact__NodeChild fix_scroll">
                {listFriendInfo &&
                        listFriendInfo.length > 0 &&
                        listFriendInfo.sort(sortName) &&
                        listFriendInfo.map((value, index) => (
                            <ContactItem key={index} friend={value} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default React.memo(ListContact);