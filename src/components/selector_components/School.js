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
import ModuleMapping from "./ModuleMapping"

function School(props) {
    const { schoolName, result } = props
    // result = {"mappings": {...}, "num_mappable": int}

    const [ open, setOpen ] = useState(false)
    const modules = []
    let i = 0
    for (const module in result["mappings"]) {
        modules[i] = module
        i++;
    }
    console.log(result["mappings"])



    return (
        <React.Fragment>
            <TableHead onClick={() => setOpen(!open)}>
                <TableRow>
                    <TableCell align="left">{schoolName}</TableCell>
                    <TableCell alight="right">{result["num_mappable"]} Modules mapped!</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableCell>
                    <Collapse in={open}>
                        <Box margin={1}>
                            {modules.map(module => <ModuleMapping 
                                moduleName={module} 
                                result={result["mappings"][module]}
                            />)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableBody>
        </React.Fragment>
    )

}

export default School