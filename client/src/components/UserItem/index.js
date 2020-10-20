import React from "react";
import API from "../../utils/API";

function PlaylistItem(props) {

    function removeUser(id) {
        console.log(props.playlistId)
        API.removeUserFromPlaylist(id, props.playlistId)
            .then(res => {

                console.log(res.data);
                // need to rerender page, might change this to a class, but otherwise rn, this works
                window.location.reload();

            })


    }


    return (
        <li>{props.displayName} <button id={props.id} onClick={() => removeUser(props.id)}>remove</button></li>
    );
}


export default PlaylistItem;
