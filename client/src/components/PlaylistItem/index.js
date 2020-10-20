import React from "react";

function PlaylistItem(props) {
    return (
        <li><a href={"/playlist/" + props.id}>{props.name}</a></li>
    );
}


export default PlaylistItem;
