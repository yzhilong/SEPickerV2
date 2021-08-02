import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import PublicIcon from '@material-ui/icons/Public';
import { Typography } from "@material-ui/core";

function NavBar(props) {

    return (
        <header class="navbar">
            <span id="navbar-icon-title">
            <PublicIcon style={{color:"white", fontSize: "2rem"}}/>
            <Typography id="navbar-sepicker">
                SEPicker
            </Typography>
            </span>
            {/* <Typography> */}
                <nav>
                    <ul>
                        <li id="navbar-selector">
                            <Link to='/'>Selector</Link>
                        </li>
                        <li id="navbar-department">
                            <Link to='/department'>Department</Link>
                        </li>
                        <li id="navbar-favourites">
                            <Link to='/favourites'>Favourites</Link>
                        </li>
                    </ul>
                </nav>
            {/* </Typography> */}
        </header>
    )
}

export default NavBar