import React, { useEffect, useState } from "react";
import Message from "../Message/Message";
import "./ListMessage.css";
import useListChildMessage from "configs/customHook/useListChildMessage";
function ListMessage(props) {
    const { keyId, uid } = props;
    const [listChild] = useListChildMessage(keyId, uid);
    const [list, setList] = useState([]);
    useEffect(() => {
        if (listChild.length > 0) {
            var cuid = listChild[0].val.uidSend;
            var ctype = listChild[0].val.type;
            var tmp = [];
            tmp.push(listChild[0]);
            var tmpTotal = [];
            for (var i = 1; i < listChild.length; i++) {
                if (
                    listChild[i].val.uidSend !== cuid ||
                    listChild[i].val.type !== ctype
                ) {
                    tmp.reverse();
                    tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
                    tmp = [];
                    ctype = listChild[i].val.type;
                    cuid = listChild[i].val.uidSend;
                    tmp.push(listChild[i]);
                    if (i === listChild.length - 1) {
                        tmp.reverse();
                        tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
                        tmp = [];
                    }
                } else if (i === listChild.length - 1) {
                    tmp.push(listChild[i]);
                    tmp.reverse();
                    tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
                    tmp = [];
                } else {
                    tmp.push(listChild[i]);
                }
            }
            if (tmp.length > 0) {
                tmp.reverse();
                tmpTotal.push({ val: tmp, type: ctype, sendUid: cuid });
            } 
            setList(tmpTotal);
        } else setList([]);
        return () => {};
    }, [listChild]);

    return (
        <div className="ListMessage__parent">
            <div className="ListMessage__listChild fix_scroll">
                {list.map((value, index) => (
                    <Message key={index} value={value} currentUid={uid} />
                ))}
            </div>
        </div>
    );
}

export default ListMessage;