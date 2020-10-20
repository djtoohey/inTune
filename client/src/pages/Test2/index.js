import React, { useEffect, useState } from "react";
import API from "../../utils/API";


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
                console.log(img);
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
            <img src={img}></img>
        </div >
    );
    // }
}


export default Test;
