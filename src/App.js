import React, { Component, useState } from "react"
import { Route, Switch } from 'react-router-dom'
import Favourites from "./pages/Favourites"
import NavBar from "./components/NavBar"
import Selector from "./pages/Selector"

function App() {

    const [ page, setPage ] = useState("Selector")

    // favourites should be a set of strings, where each element is "uni_name, MOD1, MOD2, ..., MODn"
    // modules must be in sorted order
    const [ favourites, setFavourites ] = useState(new Set())
    

    return (
        <div>
            <NavBar setPage={setPage}/>
            <Route path="/" exact>
                <Selector 
                    favourites={favourites}
                    setFavourites={setFavourites}
                /> 
            </Route>
            <Route path ="/department" exact>
                
            </Route>
            <Route path="/favourites" exact>
                <Favourites
                    favourites={favourites}
                    setFavourites={setFavourites}
                />
            </Route>
            {/* {page === "Selector" 
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
            } */}
        </div>
    )
}

export default App
