import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
function Status() {
    return (
        <div className="pt-4 px-4">
            <OwlCarousel items={3} className="owl-theme" loop nav margin={8}>
                <div>
                    <label htmlFor="">Helo1</label>
                </div>
                <div>
                    <label htmlFor="">Helo2</label>
                </div>
                <div>
                    <label htmlFor="">Helo3</label>
                </div>
                <div>
                    <label htmlFor="">Helo4</label>
                </div>
                <div>
                    <label htmlFor="">Helo5</label>
                </div>
            </OwlCarousel>
        </div>
    );
}

export default Status;
