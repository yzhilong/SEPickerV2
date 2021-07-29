import React, { useState, useEffect } from "react"
import University from "../University"
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Continent from "./Continent";

/*
TODO
    1. Conditional rendering to show if only continent/country has been selected
    2. Load selected options into props
        2.1 Results will be our point of entry into our algorithm to select universities
*/

function Results(props) {

    const { result } = props
    const continents = []
    let i = 0
    for (const continent in result) {
        console.log(continent)
        continents[i] = continent
        i++
    }

    const [ open, setOpen ] = useState(false)

    return (
        <React.Fragment>
            {continents.map(continent => <Continent continentName={continent} result={result[continent]}/>)}
        </React.Fragment>
    )
}

export default Results