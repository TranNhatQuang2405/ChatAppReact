import React from "react";

function ImageMessage({ list }) {
    const WIDTH = 100 / Math.ceil(Math.sqrt(list.length));

    return (
        <div className="childMessage__listImg">
            {list.map((value, index) => {
                if (value.indexOf("image") !== -1) {
                    return (
                        <img
                            className="messageImage__fit"
                            key={index}
                            src={value}
                            alt=""
                            width={`${WIDTH}%`}
                            height={`${WIDTH}%`}
                        />
                    );
                } else {
                    return (
                        <video
                            controls
                            key={index}
                            src={value}
                            alt=""
                            width={`${WIDTH}%`}
                            height={`${WIDTH}%`}
                        />
                    );
                }
            })}
        </div>
    );
}

export default ImageMessage;