import React from "react";
import Btn from "../../components/Btn";


function Start() {
    return (
        <div>
            <h1>inTune</h1>
            <h3>for Spotify</h3>

            <Btn text="Start" loc={"http://localhost:3001" + "/auth/spotify"} />
        </div>
    );
}


export default Start;
