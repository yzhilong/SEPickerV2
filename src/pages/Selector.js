import React, { useState, useEffect } from "react"
import EssentialModulesSelector from "../components/selector_components/EssentialModuleSelector"
import OptionalModulesSelector from "../components/selector_components/OptionalModuleSelector"
import ContinentSelector from "../components/selector_components/ContinentSelector"
import SchoolSelector from "../components/selector_components/SchoolSelector"
import CountrySelector from "../components/selector_components/CountrySelector"
import Results from "../components/selector_components/Results"

import { Collapse, Table, TableCell, Paper, Grid } from '@material-ui/core'
import './Selector.css'

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
        schools: selectedSchools,
        countries: selectedCountries,
        continents: selectedContinents
      }
    useEffect(() => {
      fetch('http://127.0.0.1:5000/backend', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(res => res.json())
        .then(data => setResult(data))
        .catch(err => console.log(err))
    }, [selectedEssentialModules, selectedOptionalModules, selectedContinents, selectedCountries, selectedSchools])

    return (
        <div className="Selector">
            {/* <h2>Delete these arrays later</h2>
            <strong>EM:</strong>{selectedEssentialModules} <br/>
            <strong>OM:</strong>{selectedOptionalModules} <br/> 
            <strong>Countries:</strong>{selectedCountries} <br/>
            <strong>Schools:</strong>{selectedSchools} <br/>
            <strong>Continents:</strong>{selectedContinents} <br/> */}
            <div class="wrap">
            <div class="box">
            <h1>Selector</h1>
              <EssentialModulesSelector stateSetter={setSelectedEssentialModules}/>
              <OptionalModulesSelector stateSetter={setSelectedOptionalModules}/>
              <ContinentSelector stateSetter={setSelectedContinents}/>
              <CountrySelector stateSetter={setSelectedCountries}/>
              <SchoolSelector stateSetter={setSelectedSchools}/>
            </div>
            <div class="box">
              <h1>Results</h1>
              {Object.keys(result).length == 0 && <h3>No Module Selected Yet</h3>}
              <Results result={result}/>
            </div>
            </div>
        </div>
    )
}

export default Selector