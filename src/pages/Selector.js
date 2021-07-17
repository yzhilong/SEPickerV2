import React, { useState } from "react"
import EssentialModulesSelector from "../components/selector_components/EssentialModuleSelector"
import OptionalModulesSelector from "../components/selector_components/OptionalModuleSelector"
import ContinentSelector from "../components/selector_components/ContinentSelector"
import SchoolSelector from "../components/selector_components/SchoolSelector"
import CountrySelector from "../components/selector_components/CountrySelector"
import Results from "../components/selector_components/Results"


function Selector(props) {

    const {essentialModules, setEssentialModules} = useState(new Set())
    const {optionalModules, setOptionalModules} = useState(new Set())
    const {continents, setContinents} = useState(new Set())
    const {countries, setCountries} = useState(new Set())
    const {schools, setSchools} = useState(new Set())

    /*
    TODO:
        1. Figure out how Multiselect works
        2. Manage onChange event for all selectors
        3. Use data to compute results
            3.1 Manage handling of results
            3.2 Results should have the modules in sorted lexicographical order
    */

    return (
        <div className="Selector">
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