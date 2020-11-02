import React from "react";
import Btn from "../../components/Btn";
import API from "../../utils/API";


function Start() {
    return (
        <div className="hero is-medium is-fluid">
            <div className="hero-body container has-text-centered ">
                <h1 className="title has-text-white">inTune</h1>
                <h2 className="subtitle has-text-white">for Spotify</h2>


                <a className="button is-success"
                    // href="https://djtoohey-intune.herokuapp.com/auth/spotify/"
                    onClick={() => (
                        API.start()
                        // .then(res => console.log(res.data))
                    )}
                >
                    HEROKU
            </a>

                <a className="button is-success"
                    href="http://localhost:3001/auth/spotify/"
                >
                    LOCAL
            </a>
            </div>
        </div >
    );
}


export default Start;
