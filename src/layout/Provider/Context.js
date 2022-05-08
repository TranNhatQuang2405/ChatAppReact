import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { UpdateSerialId } from "configs/firebase/ServiceFirebase/ServiceInsert";

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io("https://appchatvideo.herokuapp.com/");

const ContextProvider = ({ children }) => {
    const user = useSelector((state) => state.UserInfo.user);

    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState("");
    const [call, setCall] = useState({});
    const [me, setMe] = useState("");
    // const [show, setShow] = useState(false);
    // const [voice, setVoice] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    useEffect(() => {
        socket.on("me", (id) => setMe(id));
        socket.on("callUser", ({ from, name: callerName, signal }) => {
            setIsCalling(true);
            setName(callerName);
            setCall({
                isReceivingCall: true,
                from,
                name: callerName,
                signal,
            });
        });
    }, [user]);
    useEffect(() => {
        const update = async () => {
            await UpdateSerialId(me, user.key);
        };
        if (user && user.key) update();
        return () => {};
    }, [me, user]);

    // useEffect(() => {
    //     if (show) startVideo();
    //     else stopVideo();
    //     return () => {};
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [show]);

    // useEffect(() => {
    //     if (voice) startVoive();
    //     else stopVoice();
    //     return () => {};
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [voice]);

    // const handleShowCam = () => {
    //     setShow((show) => !show);
    // };

    // const handleShowVoice = () => {
    //     setVoice((voice) => !voice);
    // };

    const stopVoice = () => {
        setStream((stream) => {
            if (stream) {
                var tmpStream = stream;
                tmpStream.getAudioTracks().forEach(function (track) {
                    track.stop();
                });
                return tmpStream;
            } else return null;
        });
    };
    // const startVoive = () => {
    //     navigator.mediaDevices
    //         .getUserMedia({ video: show, audio: true })
    //         .then((currentStream) => {
    //             setStream(currentStream);
    //             myVideo.current.srcObject = currentStream;
    //         });
    // };

    const stopVideo = () => {
        setStream((stream) => {
            if (stream) {
                var tmpStream = stream;
                tmpStream.getVideoTracks().forEach(function (track) {
                    track.stop();
                });
                if (connectionRef.current) return tmpStream;
            } else return null;
        });
    };
    // const startVideo = () => {
    //     navigator.mediaDevices
    //         .getUserMedia({ video: true, audio: voice })
    //         .then((currentStream) => {
    //             setStream(currentStream);
    //             myVideo.current.srcObject = currentStream;
    //         });
    // };

    const answerCall = () => {
        setCallAccepted(true);
        setIsCalling(true);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
                const peer = new Peer({
                    initiator: false,
                    trickle: false,
                    stream: currentStream,
                    config: {
                        iceServers: [
                            { urls: ["stun:ss-turn2.xirsys.com"] },
                            {
                                username:
                                    "GIOP-iozOi546kx6umb8j6Jz6tk5MlD9GDGuRdmrYh4tr2Cv7CuIYC_VregYftCjAAAAAGJ2qMRrb2tvcm81NTU=",
                                credential:
                                    "0a694714-ce29-11ec-b50b-0242ac140004",
                                urls: [
                                    "turn:ss-turn2.xirsys.com:80?transport=udp",
                                    "turn:ss-turn2.xirsys.com:3478?transport=udp",
                                    "turn:ss-turn2.xirsys.com:80?transport=tcp",
                                    "turn:ss-turn2.xirsys.com:3478?transport=tcp",
                                    "turns:ss-turn2.xirsys.com:443?transport=tcp",
                                    "turns:ss-turn2.xirsys.com:5349?transport=tcp",
                                ],
                            },
                        ],
                    },
                });

                peer.on("signal", (data) => {
                    socket.emit("answerCall", { signal: data, to: call.from });
                });

                peer.on("stream", (currentStream) => {
                    userVideo.current.srcObject = currentStream;
                });
                peer.signal(call.signal);

                connectionRef.current = peer;
            });
    };

    const callUser = (id, name) => {
        setName(name);
        setIsCalling(true);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideo.current.srcObject = currentStream;
                const peer = new Peer({
                    initiator: true,
                    trickle: false,
                    stream: currentStream,
                    config: {
                        iceServers: [
                            { urls: ["stun:ss-turn2.xirsys.com"] },
                            {
                                username:
                                    "GIOP-iozOi546kx6umb8j6Jz6tk5MlD9GDGuRdmrYh4tr2Cv7CuIYC_VregYftCjAAAAAGJ2qMRrb2tvcm81NTU=",
                                credential:
                                    "0a694714-ce29-11ec-b50b-0242ac140004",
                                urls: [
                                    "turn:ss-turn2.xirsys.com:80?transport=udp",
                                    "turn:ss-turn2.xirsys.com:3478?transport=udp",
                                    "turn:ss-turn2.xirsys.com:80?transport=tcp",
                                    "turn:ss-turn2.xirsys.com:3478?transport=tcp",
                                    "turns:ss-turn2.xirsys.com:443?transport=tcp",
                                    "turns:ss-turn2.xirsys.com:5349?transport=tcp",
                                ],
                            },
                        ],
                    },
                });
                peer.on("signal", (data) => {
                    socket.emit("callUser", {
                        userToCall: id,
                        signalData: data,
                        from: me,
                        name: user.displayName,
                    });
                });
                peer.on("stream", (currentStream) => {
                    userVideo.current.srcObject = currentStream;
                });
                socket.on("callAccepted", (signal) => {
                    setCallAccepted(true);
                    peer.signal(signal);
                });
                connectionRef.current = peer;
            });
    };

    const leaveCall = () => {
        setIsCalling(false);
        setCallEnded(true);
        stopVideo();
        stopVoice();
        if (connectionRef.current) {
            connectionRef.current.destroy();
            window.location.reload();
        }
    };

    return (
        <SocketContext.Provider
            value={{
                call,
                callAccepted,
                myVideo,
                userVideo,
                stream,
                name,
                setName,
                callEnded,
                me,
                callUser,
                leaveCall,
                answerCall,
                isCalling,
                setIsCalling,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };