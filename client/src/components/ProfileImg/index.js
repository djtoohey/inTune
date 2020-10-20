import React from "react";

import "../ProfileImg/index.css";

function ProfileImg(props) {
    return (
        <img className="profImg" src={props.img}></img>
    );
}


export default ProfileImg;
