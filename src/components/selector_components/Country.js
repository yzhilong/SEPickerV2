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
import School from "./School"

function Country(props) {
    const { countryName, result } = props

    const [ open, setOpen ] = useState(false)
    let schools = []
    let i = 0
    for (const school in result) {
        schools[i] = [school, result[school]["num_mappable"]]
        i++;
    }
    console.log(result)

    schools.sort((schl1, schl2) => {
        const numMappableDiff = schl2[1] - schl1[1]
        if (numMappableDiff != 0) {
            return numMappableDiff
        } else {
            return schl1[0].localeCompare(schl2[0])
        }
    })

    const tmp = []
    for (let i = 0; i < schools.length; i++) {
        tmp[i] = schools[i][0]
    }
    schools = tmp



    return (
        <React.Fragment>
            <TableHead onClick={() => setOpen(!open)}>
                <TableRow>
                    <TableCell>{countryName}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableCell>
                    <Collapse in={open}>
                        <Box margin={1}>
                            {schools.map(school => <School schoolName={school} result={result[school]} />)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableBody>
        </React.Fragment>
    )

}

export default Country