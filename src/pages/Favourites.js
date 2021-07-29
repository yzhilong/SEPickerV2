import React, { useState } from "react"
import School from "../components/selector_components/School"

function Favourites(props) {

    // REQUIRE LOGIC FOR SHOWING HOW TO HANDLE ELEMENTS IN props.favoruites
    const schools = localStorage.getItem("fav");
    return (
        <div>
            {schools}
        </div>
    )
    
}

export default Favourites