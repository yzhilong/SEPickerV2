import React, { Component, useEffect, useState } from "react"
import { Route, Switch } from 'react-router-dom'
import Favourites from "./pages/Favourites"
import NavBar from "./components/NavBar"
import Selector from "./pages/Selector"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

    const [ page, setPage ] = useState("Selector")

    // favourites should be a set of strings, where each element is "uni_name, MOD1, MOD2, ..., MODn"
    // modules must be in sorted order
    const [ favourites, setFavourites ] = useState(new Set())


    // THIS IS DIAGNOSTIC ONLY! REMOVE LATER
    const [result, setResult] = useState({});
    const body = {
        essential_modules: ['CS2040','CS2030'],
        optional_modules: [],
        schools: [],
        countries: [],
        continents: []
      }
    useEffect(() => {
      fetch('http://127.0.0.1:5000/selector', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(res => res.json()).then(data => {
        console.log(data);
        setResult(data);
      }).catch(err => console.log(err))
    }, [])
    

    return (
        <div>
            {JSON.stringify(result)}
            <NavBar />
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
            {
            // {page === "Selector" 
            //     ? <Selector 
            //         favourites={favourites}
            //         setFavourites={setFavourites}
            //         /> 
            //     : page === "Favourites"
            //     ? <Favourites
            //         favourites={favourites}
            //         setFavourites={setFavourites}/>
            //     : page === "Department"
            //     ? null
            //     : null
            // } 
            }
        </div>
    )
}

export default App
