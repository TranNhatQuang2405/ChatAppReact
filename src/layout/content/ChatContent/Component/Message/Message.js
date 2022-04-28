import React from "react";
import { Avatar } from "components";
import { Dropdown } from "react-bootstrap";
import "./message.css";
function Message(props) {
    const a =
        "https://w0.peakpx.com/wallpaper/24/571/HD-wallpaper-scared-girl-anime-anim.jpg";
    const b =
        "https://yt3.ggpht.com/ytc/AKedOLRAIbph_gdGzZ9tOuxxzrWJYHGXFLbBXDUVz6HE2w=s900-c-k-c0x00ffffff-no-rj";
    const list = [b, a, a, a, a, a, a, a, a, a, a];
    const WIDTH = 100 / Math.ceil(Math.sqrt(list.length));
    const { showSend } = props;
    if (1 == 2)
        return (
            <div className="Message__Parent">
                <div className="d-flex flex-column-reverse">
                    <Avatar width="2rem" />
                </div>
                <div className="Message__Content-Left">
                    <div className="nodeChildMessage">
                        <div className="childMessage">
                            <span>
                                kubr _ 1 năm trước (đã chỉnh sửa) “No matter how
                                many people you may lose you have no choice but
                                to go on living. No matter how devastating the
                                blows may be.”
                            </span>
                            <div className="childMessage-hour">12:00 AM</div>
                        </div>
                        <div className="messageAction">
                            <Dropdown>
                                <Dropdown.Toggle
                                    as="div"
                                    bsPrefix="listContact__dropdownToggle"
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    align="start"
                                    className="text-muted messageAction__dropdown"
                                >
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-share"></i>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-trash3-fill"></i>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="userName">tran Nhat Quang</div>
                </div>
            </div>
        );
    else if (1 == 5)
        return (
            <div className="Message__Parent">
                <div className="d-flex flex-column-reverse">
                    <Avatar width="2rem" />
                </div>
                <div className="Message__Content-Left">
                    <div className="nodeChildMessage">
                        <div className="childMessage">
                            <div className="childMessage__listImg">
                                {list.map((value, index) => (
                                    <img
                                        key={index}
                                        src="https://w0.peakpx.com/wallpaper/24/571/HD-wallpaper-scared-girl-anime-anim.jpg"
                                        alt=""
                                        width={`${WIDTH}%`}
                                        height={`${WIDTH}%`}
                                    />
                                ))}
                            </div>
                            <div className="childMessage-hour">12:00 AM</div>
                        </div>
                        <div className="messageAction">
                            <Dropdown>
                                <Dropdown.Toggle
                                    as="div"
                                    bsPrefix="listContact__dropdownToggle"
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    align="start"
                                    className="text-muted messageAction__dropdown"
                                >
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-share"></i>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-trash3-fill"></i>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="userName">tran Nhat Quang</div>
                </div>
            </div>
        );
    else
        return (
            <div className="Message__Parent flex-row-reverse">
                <div className="d-flex flex-column-reverse">
                    <Avatar width="2rem" />
                </div>
                <div className="Message__Content-Right">
                    <div className="nodeChildMessage-Right">
                        <div className="childMessage">
                            <span>
                                kubr _ 1 năm trước (đã chỉnh sửa) “No matter how
                                many people you may lose you have no choice but
                                to go on living. No matter how devastating the
                                blows may be.”
                            </span>
                            <div className="d-flex">
                                <div className="childMessage-hour">
                                    12:00 AM
                                </div>
                                {showSend ? (
                                    <div className="showSend">Đã gửi</div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                        <div className="messageAction">
                            <Dropdown>
                                <Dropdown.Toggle
                                    as="div"
                                    bsPrefix="listContact__dropdownToggle"
                                >
                                    <i className="bi bi-three-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu
                                    align="end"
                                    className="text-muted messageAction__dropdown"
                                >
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-share"></i>
                                    </Dropdown.Item>
                                    <Dropdown.Item className="messageAction__dropdown-item">
                                        <i className="bi bi-trash3-fill"></i>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="userName">tran Nhat Quang</div>
                </div>
            </div>
        );
}

export default Message;
