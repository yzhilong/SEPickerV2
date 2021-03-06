import React, { useState, useEffect } from "react"

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid'

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
        minWidth: 100,
        background: "#DDDDDF",
    },
    tmp: {
        padding: theme.spacing(1),
        // minWidth: 200,
        // maxWidth: 500
    },
    favourites: {
        padding: theme.spacing(1),
        minWidth: 300,
        maxWidth: 720
    },
    school: {
        width: '100%',
        background: "rgb(247,247,247)",
        minWidth: 100,
        padding: theme.spacing(1),
        // boxShadow: "0 0 6px 1px rgb(150,150,150)"
    },
    moduleMappingTitle: {
        width: '100%',
        // minWidth: 200,
        background: "red"
    },
    moduleMappingPaper: {
        width: "100%",
        background: "#edbb3d",
        // minWidth: 200,
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

    
    return (
        <Grid container xs={12} justifyContent="center" spacing={1}>
            {countryDetails.map(countryDetail => <Country 
                countryName={countryDetail["countryName"]} 
                result={countryDetail["result"] } 
                useStyles={useStyles}
                modulesCodeTitleMappings={modulesCodeTitleMappings}/>)}
        </Grid>
    )
}

export default Results