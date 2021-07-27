import React from "react"
import { Link } from "react-router-dom"

function NavBar(props) {

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Selector</Link>
                    </li>
                    <li>
                        <Link to='/department'>Department</Link>
                    </li>
                    <li>
                        <Link to='/favourites'>Favourites</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar