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


    function compareArrays(args) {
        var fullArr = [];
        var finalArr = [];
        // store the arguments inside a single array
        for (var count = 0; count < arguments.length; count++) {
            console.log(arguments[count]);
            fullArr[count] = arguments[count];
        }
        // loop through the array of arrays, comparing array i to array j
        for (let i = 0; i < fullArr.length; i++) {
            fullArr[i].forEach(function (e) {
                for (let j = 0; j < fullArr.length; j++) {
                    if (i !== j) {
                        if (fullArr[j].includes(e) && !finalArr.includes(e)) finalArr.push(e);
                    }
                }
            });
        }

        return finalArr;
    }




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

            <button onClick={() => console.log(compareArrays([1, 2, 3], [2, 5, 8, 7], [5, 2, 1, 4], [4, 3], [7]))}>Test</button>
        </div >
    );
    // }
}


export default Test;
