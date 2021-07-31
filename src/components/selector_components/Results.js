import React, { useState, useEffect } from "react"

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';


import Country from "./Country"

/*
TODO
    1. Conditional rendering to show if only continent/country has been selected
    2. Load selected options into props
        2.1 Results will be our point of entry into our algorithm to select universities
*/

const useStyles = makeStyles((theme) => ({
    country: {
        width: '80%',
        justifyContent: "center",
        padding: theme.spacing(2),
        minWidth: 500,
        background: "#42a7f5",
    },
    tmp: {
        padding: theme.spacing(1),
    },
    school: {
        width: '100%',
        background: "#42f5a4",
    },
    moduleMappingTitle: {
        width: '100%',
        background: "red"
    },
    moduleMappingPaper: {
        width: "100%",
        background: "orange",
        padding: theme.spacing(1),
    },
    root: {
        width: '80%',
        minWidth: 500,
        background: 'blue',
    },
    innerRoot: {
        width: "100%",
    },
    }));

const modulesCodeTitleMappings = require("../../data/moduleCodeTitleMappings.json")

function Results(props) {

    const { result } = props
    const countryDetails = []
    let i = 0
    for (const continent in result) {
        for (const country in result[continent]) {
            countryDetails[i] = {"countryName": country, "result": result[continent][country]}
            i++
        }
    }

    // Display countries in order of how many schools are available, followed by lexicographic order
    countryDetails.sort((countryA, countryB) => {
        const lengthDiff = Object.keys(countryB.result).length - Object.keys(countryA.result).length
        return lengthDiff !== 0
            ? lengthDiff
            : countryA["countryName"].localeCompare(countryB["countryName"])
    })

    
    return countryDetails.map(countryDetail => <Country 
            countryName={countryDetail["countryName"]} 
            result={countryDetail["result"] } 
            useStyles={useStyles}
            modulesCodeTitleMappings={modulesCodeTitleMappings}/>)
}

export default Results