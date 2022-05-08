import React, { useContext } from "react";
import { SocketContext } from "layout/Provider/Context";
import { Modal, Button } from "react-bootstrap";
import "./VideoPlayer.css";
const VideoPlayer = () => {
    const {
        callAccepted,
        myVideo,
        userVideo,
        callEnded,
        name,
        stream,
        call,
        leaveCall,
        answerCall,
        isCalling,
    } = useContext(SocketContext);
    return (
        <Modal size="xl" centered show={isCalling} className="videoCall__modal">
            <Modal.Body className="videoCall__modal-body">
                <div className="videoCall__parent">
                    <div className="friend__video">
                        {(callAccepted && !callEnded && (
                            <video
                                playsInline
                                ref={userVideo}
                                autoPlay
                                className="video_f"
                            />
                        )) || <div className="videoCall__userName">{name}</div>}
                    </div>
                    <div className="my__video">
                        {stream && (
                            <video
                                playsInline
                                muted
                                ref={myVideo}
                                autoPlay
                                className="video_m"
                            />
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="callVideo__modal-footer">
                <div className="callVideo__parent-btn">
                    {(call.isReceivingCall && !callAccepted && (
                        <>
                            <Button
                                variant="danger"
                                onClick={leaveCall}
                                className="callVideo__btn"
                            >
                                <i className="bi bi-telephone-minus-fill"></i>
                            </Button>
                            <Button
                                variant="success"
                                onClick={answerCall}
                                className="callVideo__btn"
                            >
                                <i className="bi bi-telephone-fill"></i>
                            </Button>
                        </>
                    )) || (
                        <>
                            <Button className="callVideo__btn">
                                <i className="bi bi-mic-fill"></i>
                            </Button>
                            <Button className="callVideo__btn">
                                <i className="bi bi-camera-video-fill"></i>
                            </Button>

                            <Button
                                variant="danger"
                                onClick={leaveCall}
                                className="callVideo__btn"
                            >
                                <i className="bi bi-telephone-minus-fill"></i>
                            </Button>
                        </>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default VideoPlayer;