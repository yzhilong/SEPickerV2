import React, { useState, useEffect } from "react"
import EssentialModulesSelector from "../components/selector_components/EssentialModuleSelector"
import OptionalModulesSelector from "../components/selector_components/OptionalModuleSelector"
import ContinentSelector from "../components/selector_components/ContinentSelector"
import SchoolSelector from "../components/selector_components/SchoolSelector"
import CountrySelector from "../components/selector_components/CountrySelector"
import Results from "../components/selector_components/Results"

import { Collapse, Table, TableCell, Paper, Grid, Card, Typography } from '@material-ui/core'
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
            {/* <div class="wrap"> */}
            <Grid container spacing={3} xs={12}>
              <Grid item xs={12} lg={6}>
                <Card style={{height:"100vh", overflow:"auto"}}>
                  <h1>Selector</h1>
                  <EssentialModulesSelector stateSetter={setSelectedEssentialModules}/>
                  <OptionalModulesSelector stateSetter={setSelectedOptionalModules}/>
                  <ContinentSelector stateSetter={setSelectedContinents} state={selectedContinents}/>
                  <CountrySelector stateSetter={setSelectedCountries}/>
                  <SchoolSelector stateSetter={setSelectedSchools}/>
                </Card>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Card style={{height:"100vh", overflow:"auto"}}>
                  {/* <Typography style={{flex: 1}}>Results</Typography>
                    {Object.keys(result).length == 0 
                      && <h2>No Module Selected Yet</h2>}
                    <Results result={result}/> */}
                  <Grid container justifyContent="center">
                    <Typography variant="h3">Results</Typography>
                  </Grid>

                  {/* <Card style={{height:"50vh", width:"20vw"}}>

                  </Card> */}
                  <Grid container justifyContent="center">
                    {Object.keys(result).length == 0 
                      && <h2>No Module Selected Yet</h2>}
                  </Grid>
                </Card>
              </Grid>

            </Grid>
        </div>
    )
}

export default Selector