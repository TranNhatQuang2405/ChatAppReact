import React from "react";
import { Image } from "react-bootstrap";
import "./Avatar.css";

function Avatar(props) {
  const { width, status } = props;
  return (
    <div style={{ position: "relative" }} className="cur-pointer">
      <Image
        src="https://themesbrand.com/chatvia/layouts/assets/images/users/avatar-5.jpg"
        roundedCircle
        style={{
          width: `${width}`,
        }}
        className="mx-auto"
      ></Image>
      {status != null ? (
        <span
          style={{
            left: `calc(${width}-10px)`,
          }}
          className={`${
            status ? "avatar_span_isActive" : "avatar_span"
          } mx-auto`}
        ></span>
      ) : null}
    </div>
  );
}

export default Avatar;
