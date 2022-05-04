import React, { useState, useEffect } from "react";
import {
    Row,
    Col,
    InputGroup,
    FormControl,
    OverlayTrigger,
    Tooltip,
    Modal,
    Form,
    Button,
    Alert,
} from "react-bootstrap";
import "./ListGroup.css";
import { Avatar } from "components";
import GroupItem from "./GroupItem";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "configs/firebase/ServiceFirebase/ServiceInsert";
import { uploadImage } from "configs/firebase/StorageFirebase";
import { findMessageByKey } from "configs/firebase/ServiceFirebase/ServiceFind";
import { GetAll } from "configs/redux/Slice/AllGroupSlice";
import useListGroup from "configs/customHook/useListGroup";

function ListGroup() {
    const [show, setShow] = useState(false);
    const localTheme = useSelector((state) => state.LocalTheme.theme);
    const currentUser = useSelector((state) => state.UserInfo.user);
    const listGroup = useSelector((state) => state.AllGroup.listGroup);
    const dispatch = useDispatch();
    const [showDialog, setShowDialog] = useState(false);
    const [listGroupInfo, setlistGroupInfo] = useState([]);
    const [alert, setAlert] = useState(false);
    const [groupCreate, setGroupCreate] = useState({
        groupName: "",
        describe: "",
        image: "",
        file: null,
    });
    console.log("Group: ", listGroup.length);
    console.log("Info Ngoai: ", listGroupInfo.length);

    useListGroup(currentUser.uid);
    const filterListGroup = (val) => {
        console.log("Info Trong: ", listGroupInfo.length);
        const tmp = listGroupInfo.filter((value) => {
            return value.key === val.key;
        });
        if (tmp.length > 0) return false;
        else return true;
    };

    const handleChangeName = (e) => {
        var text = e.target.value;
        setGroupCreate((prev) => {
            return { ...prev, groupName: text };
        });
    };

    const handleChangeDescript = (e) => {
        var text = e.target.value;
        setGroupCreate((prev) => {
            return { ...prev, describe: text };
        });
    };

    const handleChangeImage = (e) => {
        if (e.target.files.length > 0) {
            setGroupCreate((prev) => {
                const url = URL.createObjectURL(e.target.files[0]);
                return {
                    ...prev,
                    file: e.target.files[0],
                    image: url,
                };
            });
        }
    };

    const handleClose = () => {
        setGroupCreate({ groupName: "", describe: "" });
        setAlert(false);
        setShowDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var name = String(groupCreate.groupName).trim();
        var describe = String(groupCreate.describe).trim();
        var file = groupCreate.file;
        if (
            name === "" ||
            describe === "" ||
            name === null ||
            describe === null
        ) {
            setAlert(false);
            setShowDialog(true);
        } else {
            var url = "";
            if (file !== null && file) url = await uploadImage(file, "demo");
            if (url === undefined) url = "";
            addMessage(2, name, url, [currentUser.uid])
                .then(() => {
                    setAlert(true);
                    setShowDialog(true);
                    setGroupCreate({ groupName: "", describe: "" });
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };

    const sortNameGroup = (a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        let isMounteda = true;
        const handleLoad = async () => {
            listGroup.forEach(async (key) => {
                const get = await findMessageByKey(key);
                if (isMounteda)
                    if (filterListGroup(get))
                        setlistGroupInfo((prev) => [...prev, get]);
            });
        };
        if (listGroup) handleLoad();
        return () => {
            isMounteda = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listGroup]);

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
                        onHide={() => {
                            setShow(false);
                            handleClose();
                        }}
                        data-layout-mode={localTheme}
                        dialogClassName="listGroup__dialog"
                    >
                        <Modal.Header closeButton className="modal__bg-fix">
                            <h5>Create Group</h5>
                        </Modal.Header>
                        <Form onSubmit={handleSubmit}>
                            <Modal.Body className="modal__bg-fix">
                                <div className="mb-4 d-flex flex-column">
                                    <Form.Label
                                        htmlFor="imageGroup"
                                        className="m-auto"
                                    >
                                        <Avatar
                                            width="6rem"
                                            url={groupCreate.image}
                                        />
                                    </Form.Label>
                                    <InputGroup className="rounded-3">
                                        <FormControl
                                            id="imageGroup"
                                            type="file"
                                            className="input__fileImage"
                                            onChange={handleChangeImage}
                                        ></FormControl>
                                    </InputGroup>
                                </div>
                                <div className="mb-4">
                                    <Form.Label htmlFor="group_name">
                                        Group Name
                                    </Form.Label>
                                    <InputGroup className="mb-4 rounded-3">
                                        <FormControl
                                            className="bg-light border-0 seach__text-color lh-2"
                                            placeholder="Set name for group"
                                            value={groupCreate.groupName}
                                            onChange={handleChangeName}
                                            minLength={6}
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
                                            value={groupCreate.describe}
                                            onChange={handleChangeDescript}
                                            minLength={6}
                                        />
                                    </InputGroup>
                                </div>
                            </Modal.Body>
                            <Modal.Footer className="modal__bg-fix">
                                <Button
                                    bsPrefix="btn_color"
                                    onClick={() => {
                                        setShow(false);
                                        handleClose();
                                    }}
                                >
                                    Close
                                </Button>
                                <Button type="submit" bsPrefix="btn_color">
                                    Create Group
                                </Button>
                            </Modal.Footer>
                        </Form>

                        {showDialog === true &&
                            (alert === true ? (
                                <Alert variant="success" className="mb-0">
                                    <Alert.Heading>Success !!!</Alert.Heading>
                                </Alert>
                            ) : (
                                <Alert
                                    variant="danger"
                                    className="mb-0 pt-1 pb-0"
                                >
                                    <Alert.Heading>
                                        Oh snap! You got an error!
                                    </Alert.Heading>
                                    <p>Name or description is empty !!!</p>
                                </Alert>
                            ))}
                    </Modal>
                    <OverlayTrigger
                        placement="bottom"
                        overlay={<Tooltip>Create Group</Tooltip>}
                    >
                        <i
                            className="bi bi-people-fill float-end me-2 cur-pointer"
                            onClick={() => {
                                setShow(true);
                            }}
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
                {listGroupInfo &&
                        listGroupInfo.length > 0 &&
                        listGroupInfo.sort(sortNameGroup) &&
                        listGroupInfo.map((value, index) => (
                            <GroupItem
                                val={value.val}
                                key={index}
                                keyId={value.key}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default React.memo(ListGroup);