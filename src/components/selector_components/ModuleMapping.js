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

function ModuleMapping(props) {
    const { moduleName, result } = props
    // result = {
    //     "EquivalentNUSModule1": [{"PU Module Code": "PU123", "PU Module Title": "DUMMY NAME"}, ...],
    //     "EquivalentNUSModule2": [...],
    // }

    const [ open, setOpen ] = useState(true)
    const equivalentNUSModules = []
    let i = 0
    for (const module in result) {
        equivalentNUSModules[i] = module
        i++;
    }
    console.log(equivalentNUSModules)

    // // THIS SHOULD BE CARD! TEMPORARY PLACEHOLDER
    // function createMapping(NUSModuleCode) {
    //     const innerDisplay = mapping => 
    //         (<TableRow>
    //             <TableCell>
    //                 {mapping["PU Module Code"]}
    //             </TableCell>
    //             <TableCell>
    //                 {mapping["PU Module Title"]}
    //             </TableCell>
    //         </TableRow>)
        
    //     if (equivalentNUSModules.length == 1) {
    //         return (
    //             <TableRow>
    //                 <TableCell>
    //                     {result[NUSModuleCode][0]["PU Module Code"]}
    //                 </TableCell>
    //                 <TableCell>
    //                     {result[NUSModuleCode][0]["PU Module Title"]}
    //                 </TableCell>
    //             </TableRow>
    //         )
    //     }


    //     return (
    //         <TableRow>
    //             <TableCell>
    //                 <b>{NUSModuleCode}</b>
    //             </TableCell>
    //             <TableCell>
    //                 {result[NUSModuleCode].map(innerDisplay)}
    //             </TableCell> 
    //         </TableRow>
    //     )
    // }



    // return (
    //     <React.Fragment>
    //         <TableHead onClick={() => setOpen(!open)}>
    //             <TableRow>
    //                 <TableCell align="left">
    //                     <p align="left">{moduleName}</p>
    //                     {equivalentNUSModules.length > 1
    //                         ? "equivalent to " + equivalentNUSModules.toString()
    //                         : ""
    //                     }
    //                 </TableCell>
    //             </TableRow>
    //         </TableHead>
    //         <TableBody>
    //             <TableCell>
    //                 <Collapse in={open}>
    //                     <Box margin={1}>
    //                         {equivalentNUSModules.map(createMapping)}
    //                     </Box>
    //                 </Collapse>
    //             </TableCell>
    //         </TableBody>
    //     </React.Fragment>
    // )

}

export default ModuleMapping