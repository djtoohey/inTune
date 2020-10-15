import React from "react";

function NewSet() {
    return (
        <div>
            {/* https://material-ui.com/components/slider/#slider-with-input-field */}
            <form action="/action_page.php">
                <label for="fname">First name:</label>
                <input type="text" id="fname" name="fname" value="John"></input>
                <label for="lname">Last name:</label>
                <input type="text" id="lname" name="lname" value="Doe"></input>
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}


export default NewSet;
