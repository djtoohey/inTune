import React from "react";
import API from "../../utils/API";


class Start extends React.Component {
    render() {
        return (
            <div className="hero is-medium is-fluid">
                <div className="hero-body container has-text-centered ">
                    <h1 className="title has-text-white">inTune</h1>
                    <h2 className="subtitle has-text-white">for Spotify</h2>


                    <a className="button is-success"
                        href="http://localhost:3001/auth/spotify"
                    // onClick={() => (
                    //     API.start()
                    //         .then(res => console.log(res.data))
                    // )}
                    >
                        LOGIN
            </a>

                    {/* <a className="button is-success"
                        href="http://localhost:3001/auth/spotify/"
                    >
                        LOCAL
            </a> */}
                </div>
            </div >
        );
    }
}


export default Start;
