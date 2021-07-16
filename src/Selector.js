import React from "react"
import EssentialModulesSelector from "./SelectorComponents/EssentialModuleSelector"
import OptionalModulesSelector from "./SelectorComponents/OptionalModuleSelector"
import ContinentSelector from "./SelectorComponents/ContinentSelector"
import SchoolSelector from "./SelectorComponents/SchoolSelector"
import CountrySelector from "./SelectorComponents/CountrySelector"
import Results from "./SelectorComponents/Results"


function Selector(props) {
    return (
        <div className="Navbar">
            <h1>Selector</h1>
            <EssentialModulesSelector />
            <OptionalModulesSelector />
            <ContinentSelector />
            <CountrySelector />
            <SchoolSelector />

            <Results />

        </div>
    )
}

export default Selector