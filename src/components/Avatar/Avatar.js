import React from "react";
import { Image } from "react-bootstrap";
function Avatar(props) {
    const { width, status } = props;
    return (
        <div style={{ position: "relative" }}>
            <Image
                src="https://themesbrand.com/chatvia/layouts/assets/images/users/avatar-5.jpg"
                roundedCircle
                style={{
                    width: `${width}`,
                }}
                className="mx-auto"
            ></Image>
            <span
                style={{
                    backgroundColor: `${status ? "#06d6a0" : "#ffd166"}`,
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    position: "absolute",
                    right: 3,
                    bottom: 0,
                    border: "2px solid var(--bs-card-bg)",
                }}
            ></span>
        </div>
    );
}

export default Avatar;
