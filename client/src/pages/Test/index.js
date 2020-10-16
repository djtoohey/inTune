import React from "react";
import API from "../../utils/API";


function Test() {
    var test = "";
    function loadUser() {
        API.getUser()
            .then(res =>
                test = res)
    };

    return (
        <div>
            <h1>TEST PAGE</h1>
            <button
                onClick={loadUser}>
                Test
            </button>
            <p>USERNAME: {test}</p>
        </div>
    );
}


export default Test;
