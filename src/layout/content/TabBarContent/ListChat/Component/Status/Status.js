import React from "react";
import Slider from "react-slick";
import StatusItem from "./StatusItem";
function Status() {
    const settings = {
        className: "center",
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
            <Slider {...settings}>
                <StatusItem />
                <StatusItem />
                <StatusItem />
                <StatusItem />
                <StatusItem />
                <StatusItem />
                <StatusItem />
                <StatusItem />
                <StatusItem />
                <StatusItem />
            </Slider>
        </div>
    );
}

export default Status;
