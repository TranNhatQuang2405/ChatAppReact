import React, { useState } from "react";
import Slider from "react-slick";
import StatusItem from "./StatusItem";
import { useSelector } from "react-redux";
import useListFriend from "configs/customHook/useListFriend";
import { findUserByUid } from "configs/firebase/ServiceFirebase/ServiceFind";
import "./Status.css";
function Status() {
    const currentUser = useSelector((state) => state.UserInfo.user);
    const listFriend = useSelector((state) => state.AllFriend.listFriend);
    const [listFriendInfo, setListFriendInfo] = useState([]);
    useListFriend(currentUser.uid);

    const sortOnline = (a, b) => {
        if (a.IsOnline > b.IsOnline) {
            return -1;
        }
        if (a.IsOnline < b.IsOnline) {
            return 1;
        }
        return 0;
    };
    const filterListFriend = (val) => {
        console.log(val);
        const tmp = listFriendInfo.filter((value) => {
            return value.uid === val.uid;
        });
        console.log(tmp);
        if (tmp.length > 0) return false;
        else return true;
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
    const settings = {
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        nextArrow: <></>,
        prevArrow: <></>,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 8,
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 5,
                },
            },
        ],
    };
    return (
        <div className="px-3">
            <Slider {...settings} className="custom__slider">
                {listFriendInfo &&
                    listFriendInfo.length > 0 &&
                    listFriendInfo.sort(sortOnline) &&
                    listFriendInfo.map((value, index) => (
                        <StatusItem key={index} friend={value} />
                    ))}
            </Slider>
        </div>
    );
}

export default Status;
