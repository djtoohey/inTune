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

            <Btn text="Create New Set" loc="/newset"></Btn>
            <Btn text="Previous Set" loc={"http://localhost:3001/auth/spotify"}></Btn>

        </div>
    );
}


export default Select;
