import React, { Component, useState } from "react"
import Favourites from "./Favourites"
import Navbar from "./Navbar"
import Selector from "./Selector"

function App() {

    const [ page, setPage ] = useState("Selector")

    // favourites should be a set of strings, where each element is "uni_name, MOD1, MOD2, ..., MODn"
    const [ favourites, setFavourites ] = useState(new Set()) 
    

    return (
        <div>
            <Navbar setPage={setPage}/>
            {page === "Selector" 
                ? <Selector 
                    favourites={favourites}
                    setFavourites={setFavourites}
                    /> 
                : page === "Favourites"
                ? <Favourites
                    favourites={favourites}
                    setFavourites={setFavourites}/>
                : page === "Department"
                ? null
                : null
            }
        </div>
    )
}

export default App
