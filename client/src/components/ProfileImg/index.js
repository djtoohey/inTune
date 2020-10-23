import React from "react";

import "../ProfileImg/index.css";

function ProfileImg(props) {
    return (
        <a href="/select"><img className="profImg" src={props.img}></img></a>
    );
}


export default ProfileImg;
