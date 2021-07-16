import React, {Component} from "react"
import Navbar from "./Navbar"
import Selector from "./Selector"

function App() {
    const page = "selector"
    return (
        <div>
            <Navbar />
            {page === "selector" ? <Selector /> : null}
        </div>
    )
}

export default App
