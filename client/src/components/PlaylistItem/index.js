import React from "react";

function PlaylistItem(props) {
    return (
        <li><a className="button mb-1" href={"/playlist/" + props.id}>{props.name}</a></li>
    );
}


export default PlaylistItem;
