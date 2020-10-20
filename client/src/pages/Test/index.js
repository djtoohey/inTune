import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import ProfileImg from "../../components/ProfileImg";

function Test() {

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
                console.log(res.data);
            }
                // console.log(state.test)

                // this.setState({ test: res.data.user.displayName })
                // console.log(res.data.displayName)

            )
    };



    // render() {
    return (
        <div>
            <h1>TEST PAGE</h1>
            {/* <button
                onClick={loadUser}>
                Test
            </button> */}
            <p>USERNAME: {user.displayName}</p>
            <a href="/test2"><img src={img}></img>
            </a>
            <ProfileImg img={img}></ProfileImg>
        </div >
    );
    // }
}


export default Test;
