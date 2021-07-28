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
import Country from "./Country"

function Continent(props) {
    const { continentName, result } = props

    const [ open, setOpen ] = useState(false)
    const countries = []
    let i = 0
    for (const country in result) {
        countries[i] = country
        i++;
    }



    return (
        <React.Fragment>
            <TableHead onClick={() => setOpen(!open)}>
                <TableRow>
                    <TableCell>{continentName}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableCell>
                    <Collapse in={open}>
                        <Box margin={1}>
                            {countries.map(country => <Country countryName={country} result={result[country]}/>)}
                            </Box>
                    </Collapse>
                </TableCell>
            </TableBody>
        </React.Fragment>
    )

}

export default Continent