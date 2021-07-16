import React from "react"

function Navbar(props) {

    const handleClick = event => props.setPage(event.target.value)

    return (
        <div className="Navbar">
            <input type="button" name="Selector" value="Selector" onClick={handleClick}/>
            <input type="button" name="Favourites" value="Favourites" onClick={handleClick}/>
            <input type="button" name="Department" value="Department" onClick={handleClick}/>
        </div>
    )
}

export default Navbar