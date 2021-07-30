import React, { useState, useEffect } from "react"


import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Table, TableRow, TableCell, TableHead } from "@material-ui/core";

function ModuleMapping(props) {
    const { moduleName, result, useStyles } = props
    // result = {
    //     "EquivalentNUSModule1": [{"PU Module Code": "PU123", "PU Module Title": "DUMMY NAME"}, ...],
    //     "EquivalentNUSModule2": [...],
    // }

    const equivalentNUSModules = []
    let i = 0
    for (const module in result) {
        equivalentNUSModules[i] = module
        i++;
    }
    console.log(equivalentNUSModules)

    const classes = useStyles()

    function getPUMap(moduleCode) {
        return result[moduleCode].map(mod => {
                return (
                    <Table>
                        <TableRow>
                            <Typography>{mod["PU Module Code"]}</Typography>
                        </TableRow>
                        <TableRow>
                        <Typography>{mod["PU Module Title"]}</Typography>
                        </TableRow>
                    </Table>
                )
            }
        )
    }

    if (equivalentNUSModules.length == 1) {
        return (
            <TableRow>
                <TableCell>
                    <Typography>{moduleName}</Typography>
                </TableCell>
                <TableCell>
                    {getPUMap(equivalentNUSModules[0])}
                </TableCell>
            </TableRow>
            )
    } else {
        return (
            <React.Fragment>
                <TableHead>
                    <TableCell>
                        <Typography>Modules equivalent to {moduleName}</Typography>
                    </TableCell>
                </TableHead>
                {equivalentNUSModules.map(mod => { return (
                    <TableHead>
                        <TableCell>
                            <Typography>{mod}</Typography>
                        </TableCell>
                        <TableCell>
                            {getPUMap(mod)}
                        </TableCell>
                    </TableHead>)
                })}
            </React.Fragment>
        )
    }
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