import React, { useEffect, useState } from "react";
import Btn from "../../components/Btn";
import ProfileImg from "../../components/ProfileImg";
import API from "../../utils/API";



function Select() {
    const [user, setUser] = useState({});
    const [img, setImg] = useState("");

    useEffect(() => {
        loadUser()

    }, []);

    function loadUser() {
        API.getUser()
            .then(res => {
                setUser(res.data);
                setImg(res.data._json.images[0].url)
                console.log(img);
            })
    };

    return (
        <div>
            <ProfileImg img={img}></ProfileImg>
            <div className="hero is-medium is-fluid">
                <div className="hero-body container has-text-centered ">
                    <h1 className="title has-text-white">Home</h1>
                    <h1 className="subtitle has-text-white">What would you like to do?</h1>
                    <a className="button is-success" href="/newset"> Create New Set</a>
                    <br></br><br></br>
                    <a className="button is-success" href="/previous"> Previous Set</a>
                    {/* <Btn text="Create New Set" loc="/newset"></Btn>
                    <Btn text="Previous Set" loc="/previous"></Btn> */}
                </div>
            </div>
        </div>
    );
}


export default Select;
