import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import StatusItem from "./StatusItem";
import { useSelector } from "react-redux";
import "./status.css";
function Status() {
    const listFriend = useSelector((state) => state.AllFriend.listFriend);
    const [listFriendInfo, setListFriendInfo] = useState(listFriend);

    const sortOnline = (a, b) => {
        if (a.val.IsOnline > b.val.IsOnline) {
            return -1;
        }
        if (a.val.IsOnline < b.val.IsOnline) {
            return 1;
        }
        return 0;
    };

    useEffect(() => {
        setListFriendInfo([...listFriend]);
        return () => {};
    }, [listFriend]);
    // const filterListFriend = (val) => {
    //     const tmp = listFriendInfo.filter((value) => {
    //         return value.uid === val.uid;
    //     });
    //     if (tmp.length > 0) return false;
    //     else return true;
    // };

    // React.useEffect(() => {
    //     let isMounted = true;
    //     const handleLoad = async () => {
    //         listFriend.forEach(async (uid) => {
    //             const get = await findUserByUid(uid);
    //             if (isMounted)
    //                 if (filterListFriend(get))
    //                     setListFriendInfo((prev) => [...prev, get]);
    //         });
    //     };
    //     if (listFriend) handleLoad();
    //     return () => {
    //         isMounted = false;
    //     };
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [listFriend]);
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
                        <StatusItem key={index} friend={value.val} />
                    ))}
            </Slider>
        </div>
    );
}

export default Status;
