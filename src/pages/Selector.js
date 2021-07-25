import React, { useState, useEffect } from "react"
import EssentialModulesSelector from "../components/selector_components/EssentialModuleSelector"
import OptionalModulesSelector from "../components/selector_components/OptionalModuleSelector"
import ContinentSelector from "../components/selector_components/ContinentSelector"
import SchoolSelector from "../components/selector_components/SchoolSelector"
import CountrySelector from "../components/selector_components/CountrySelector"
import Results from "../components/selector_components/Results"


function Selector(props) {

    // const [essentialModules, setEssentialModules] = useState(new Set())
    // const [optionalModules, setOptionalModules] = useState(new Set())
    // const [continents, setContinents] = useState(new Set())
    // const [countries, setCountries] = useState(new Set())
    // const [schools, setSchools] = useState(new Set())

    const [selectedEssentialModules, setSelectedEssentialModules] = useState([])
    const [selectedOptionalModules, setSelectedOptionalModules] = useState([])
    const [selectedContinents, setSelectedContinents] = useState([])
    const [selectedCountries, setSelectedCountries] = useState([])
    const [selectedSchools, setSelectedSchools] = useState([])


    const [result, setResult] = useState({});
    const body = {
        essential_modules: selectedEssentialModules,
        optional_modules: selectedOptionalModules,
        schools: selectedContinents,
        countries: selectedCountries,
        continents: selectedSchools
      }
    useEffect(() => {
      fetch('http://127.0.0.1:5000/selector', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(res => res.json())
        .then(data => setResult(data))
        .catch(err => console.log(err))
    }, [])



    /*
    TODO:
        1. Figure out how Multiselect works
        2. Manage onChange event for all selectors
        3. Use data to compute results
            3.1 Manage handling of results
            3.2 Results should have the modules in sorted lexicographical order
    */

    // The result output is simply for diagnostic purposes
    return (
        <div className="Selector">   
            {JSON.stringify(result)}       
            <h1>Selector</h1>
            <EssentialModulesSelector/>
            <OptionalModulesSelector />
            <ContinentSelector />
            <CountrySelector />
            <SchoolSelector />
            <Results result={result}/>

        </div>
    )
}

export default Selector