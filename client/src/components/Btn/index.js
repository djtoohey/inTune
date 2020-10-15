import React from "react";


function Btn(props) {
    return (
        <a href={props.loc}>
            <button >
                {props.text}
            </button>
        </a>
    );
}


export default Btn;
