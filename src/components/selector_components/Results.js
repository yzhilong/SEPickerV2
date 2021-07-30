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
    root: {
        width: '80%',
        minWidth: 500,
    },
    innerRoot: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
        width: '100%'
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
        textDecoration: 'underline',
        },
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

    // Display countries in lexicographical order
    countryDetails.sort((countryA, countryB) => countryA["countryName"].localeCompare(countryB["countryName"]))

    
    return countryDetails.map(countryDetail => <Country 
            countryName={countryDetail["countryName"]} 
            result={countryDetail["result"] } 
            useStyles={useStyles}
            modulesCodeTitleMappings={modulesCodeTitleMappings}/>)
}

export default Results