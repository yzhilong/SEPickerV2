import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import PublicIcon from '@material-ui/icons/Public';

function NavBar(props) {

    return (
        <header class="navbar">
            <span id="navbar-icon-title">
            <PublicIcon style={{color:"white", fontSize: "3rem"}}/>
            <h1 id="navbar-sepicker">
                SEPicker
            </h1>
            </span>
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
        </header>
    )
}

export default NavBar