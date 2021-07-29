import React, { useState, useEffect } from "react"
import ModuleMapping from "./ModuleMapping"

import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Table from "@material-ui/core/Table"
import { TableHead, TableRow, TableCell, TableContainer, Paper } from "@material-ui/core";

function School(props) {
    const { schoolName, result, useStyles } = props
    // result = {"mappings": {...}, "num_mappable": int}

    const [ open, setOpen ] = useState(false)
    const modules = []
    let i = 0
    for (const module in result["mappings"]) {
        modules[i] = module
        i++;
    }
    console.log(result["mappings"])

    const classes = useStyles(); 

    return (
        <React.Fragment>
            <AccordionDetails>
                <Accordion className={classes.innerRoot}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <div>
                            <Typography>{schoolName}</Typography>
                            <Typography>{result['num_mappable']} module(s) available!</Typography>
                        </div>
                    </AccordionSummary>
                        <TableContainer component={Paper}>
                            <Table className={classes.innerRoot} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography>NUS Module</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>Partner University Module</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                {modules.map(module => <ModuleMapping moduleName={module} result={result["mappings"][module]} useStyles={useStyles}/>)}
                            </Table>
                        </TableContainer>
                </Accordion>
            </AccordionDetails>
        </React.Fragment>
    )

}

export default School