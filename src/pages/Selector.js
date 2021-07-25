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


    /*
    TODO:
        1. Figure out how Multiselect works
        2. Manage onChange event for all selectors
        3. Use data to compute results
            3.1 Manage handling of results
            3.2 Results should have the modules in sorted lexicographical order
    */

    // useEffect(() => {
    //     fetch("http://127.0.0.1:5000/").then(response => response.text().then(data => {console.log(data)}))
    // }, []);
    // const [countries, setCountries] = useState([]);
    // const partnerUniversitiesSet = new Set();

    // const modulesArr = require("../data/modules.json")
    // const modules = []
    // for (var i = 0; i < modulesArr.length; i++) {
    //     modules.push({name: modulesArr[i], id: i})
    // }
    /*
    const countriesSet = new Set();
    const partnerUniversitiesSet = new Set();
    async function fill_countries_and_pu() {
        const data = await csv(school_country_continent_csv);
        // console.log(data);
        for (var i = 0; i < data.length; i++) {
            countriesSet.add(data[i]["Country"]);
            partnerUniversitiesSet.add(data[i]["Partner University"]);
        }
    }
    fill_countries_and_pu().then(
        data => console.log([...countriesSet].sort())
        );
    */
    // console.log([...countriesSet]);
    // useEffect(() => {
    //     csv(school_country_continent_csv).then(data => {
    //         console.log(data[10])
    //         for (var i = 0; i < data.length; i++) {
    //             setCountries(prevState => [...prevState, data[i]["Country"]])
    //             partnerUniversitiesSet.add(data[i]["Partner University"])
    //         }
    //     });
    // }, [])
    // const countriesSet = new Set(countries);
    // console.log([...countriesSet].sort())

    return (
        <div className="Selector">            
            <h1>Selector</h1>
            <EssentialModulesSelector/>
            <OptionalModulesSelector />
            <ContinentSelector />
            <CountrySelector />
            <SchoolSelector />
            <Results />

        </div>
    )
}

export default Selector