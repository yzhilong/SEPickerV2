import React, { useState, useEffect } from "react"


import Typography from '@material-ui/core/Typography';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Table, TableRow, TableCell, TableHead, Box, Grid, Paper } from "@material-ui/core";

function ModuleMapping(props) {
    const { moduleName, result, useStyles, modulesCodeTitleMappings } = props
    const moduleTitle = modulesCodeTitleMappings[moduleName]
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

    const classes = useStyles()

    function getPUModules(equivModule) {
        return result[equivModule].map(mod => {
                return (
                    <Grid item xs={12}>
                        <Typography>
                            <Box textAlign="left" style={{padding: 5, fontSize: "16px", fontWeight: "bold", fontFamily: "Georgia, sans-serif"}}>
                                {mod["PU Module Code"]}
                            </Box>
                            <Box textAlign="left" style={{padding: 5, fontSize: "16px", fontFamily: "Georgia, sans-serif"}}>
                                {mod["PU Module Title"]}
                            </Box>
                        </Typography>
                    </Grid>
                )
            }
        )
    }

    function getMapping(moduleCode) {
        return (
            <Grid container item xs={12} spacing={0} component={Paper} className={classes.moduleMappingPaper} elevation={1}>
                <Grid item container xs={6} alignItems="center">
                    <Grid item xs={6}>
                        <div style={{padding: 5, textAlign: "left", fontWeight: "bold", fontSize: "16px", fontFamily: "Georgia, sans-serif"}}>
                            {moduleCode}
                        </div>
                        <div style={{padding: 5, textAlign: "left", fontSize: "16px", fontFamily: "Georgia, sans-serif"}}>
                            {modulesCodeTitleMappings[moduleCode]}
                        </div>
                    </Grid>
                </Grid>

                <Grid container item xs={6} alignItems="center">
                    {getPUModules(moduleCode)}
                </Grid>

            </Grid>
        )
    }

    if (equivalentNUSModules.length == 1 && equivalentNUSModules[0] === moduleName) {
        return <Grid container item xs={12} className={classes.tmp}>{getMapping(equivalentNUSModules[0])}</Grid>
    }

    return (
        <Grid container item xs={12} spacing={0} justifyContent="center" className={classes.tmp}>
            <Grid container item xs={12} justifyContent="center" className={classes.tmp} component={Paper} elevation={1} style={{backgroundColor: "#F1F1F1"}}>
                <Grid item xs={12}  style={{padding: 5}}>
                    <Typography style={{fontStyle: "italic", fontFamily: "Georgia, sans-serif", fontSize: "12px"}}>
                        Module(s) with similar content to {moduleName} {moduleTitle}
                    </Typography>
                </Grid>
                {equivalentNUSModules.map(mod => {
                    return (
                        <Grid container item xs={12} justifyContent="center" className={classes.tmp}>
                            {getMapping(mod)}
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )

    // if (equivalentNUSModules.length == 1) {
    //     return (
    //         <TableRow>
    //             <TableCell>
    //                 <Typography>{moduleName}</Typography>
    //                 <Typography>{moduleTitle}</Typography>
    //             </TableCell>
    //             <TableCell>
    //                 {getPUMap(equivalentNUSModules[0])}
    //             </TableCell>
    //         </TableRow>
    //         )
    // } else {
    //     return (
    //         <React.Fragment>
    //             <TableHead>
    //                 <TableCell>
    //                     <Typography>Modules equivalent to {moduleName}</Typography>
    //                 </TableCell>
    //             </TableHead>
    //             {equivalentNUSModules.map(mod => { return (
    //                 <TableHead>
    //                     <TableCell>
    //                         <Typography>{mod}</Typography>
    //                         <Typography>{moduleTitle}</Typography>
    //                     </TableCell>
    //                     <TableCell>
    //                         {getPUMap(mod)}
    //                     </TableCell>
    //                 </TableHead>)
    //             })}
    //         </React.Fragment>
    //     )
    // }
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
