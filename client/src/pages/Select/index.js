import React from "react";
import Btn from "../../components/Btn";



function Select() {
    return (
        <div>

            <Btn text="Create New Set" loc="/newset"></Btn>
            <Btn text="Previous Set" loc={"http://localhost:3001" + "/auth/spotify"}></Btn>

        </div>
    );
}


export default Select;
