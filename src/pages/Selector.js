import React, { useState, useEffect } from "react"
import EssentialModulesSelector from "../components/selector_components/EssentialModuleSelector"
import OptionalModulesSelector from "../components/selector_components/OptionalModuleSelector"
import ContinentSelector from "../components/selector_components/ContinentSelector"
import SchoolSelector from "../components/selector_components/SchoolSelector"
import CountrySelector from "../components/selector_components/CountrySelector"
import Results from "../components/selector_components/Results"

import { Collapse, Table, TableCell, Paper, Grid, Card, Typograph, CircularProgress } from '@material-ui/core'
import { sizing } from '@material-ui/system';

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
    const [loading, setLoading] = useState(false);
    const body = {
        essential_modules: selectedEssentialModules,
        optional_modules: selectedOptionalModules,
        schools: selectedSchools,
        countries: selectedCountries,
        continents: selectedContinents
      }




    useEffect(() => {
      setLoading(true)
      fetch('http://127.0.0.1:5000/backend', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
      }).then(res => res.json())
        .then(data => {setLoading(false); setResult(data)})
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
            {/* <div class="wrap"> */}
            <Grid container spacing={3}>
              <Grid item xs={12} lg={6}>
                <Paper id="left-box">
                  <h1>Selector</h1>
                  <EssentialModulesSelector stateSetter={setSelectedEssentialModules}/>
                  <OptionalModulesSelector stateSetter={setSelectedOptionalModules}/>
                  <ContinentSelector stateSetter={setSelectedContinents} state={selectedContinents}/>
                  <CountrySelector stateSetter={setSelectedCountries}/>
                  <SchoolSelector stateSetter={setSelectedSchools}/>
                </Paper>
              </Grid>

              <Grid item xs={12} lg={6} style={{height:"100vh"}}>
                <Paper id="right-box">
                    <h1>Results</h1>
                    {loading
                      ? <h2>Loading...</h2>
                      : selectedEssentialModules.length + selectedOptionalModules.length === 0
                      ? <h2>No Module Selected Yet</h2>
                      : Object.keys(result).length === 0 
                      ? <h2>No mappings found :(</h2>
                      : <p></p>}
                    <Results result={result}/>
                </Paper>
              </Grid>


            </Grid>
        </div>
    )
}

export default Selector