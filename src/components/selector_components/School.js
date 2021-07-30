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
import { TableHead, TableRow, TableCell, TableContainer, Paper, TextField, Grid } from "@material-ui/core";

function School(props) {
    const { schoolName, result, useStyles, modulesCodeTitleMappings } = props
    // result = {"mappings": {...}, "num_mappable": int}

    function toString() {
        return schoolName + Object.keys(result.mappings).join();
    }

    const [ open, setOpen ] = useState(false)

    const defaultNote = (toString() in localStorage) ? localStorage.getItem(toString()) : ""
    // console.log(toString() in localStorage)
    const [ notes, setNotes ] = useState(defaultNote)

    const modules = []
    let i = 0
    for (const module in result["mappings"]) {
        modules[i] = module
        i++;
    }

    function onFavHandler(event) {
        event.stopPropagation();
        const cookieName = toString()
        if (cookieName in localStorage) {
            // const existing = JSON.parse(localStorage.getItem(cookieName))
            localStorage.setItem(cookieName, notes)
        } else {
            localStorage.setItem(cookieName, notes);
        }
    }

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
                            <button onClick={onFavHandler}>button</button>
                            <Typography>{result['num_mappable']} module(s) available!</Typography>
                        </div>
                    </AccordionSummary>

                    <Grid container spacing={0} justifyContent="center" alignContent="center">
                        <Grid item xs={6}>
                            <div style={{border: "solid 1px blue"}}>NUS Module</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{border: "solid 1px blue"}}>Partner University Module</div>
                        </Grid>
                    </Grid>
                    {modules.map(module => <ModuleMapping 
                                        moduleName={module} 
                                        result={result["mappings"][module]} 
                                        useStyles={useStyles}
                                        modulesCodeTitleMappings={modulesCodeTitleMappings}/>)}
                    <TextField 
                        label="Notes" 
                        multiline={true}
                        className={classes.innerRoot}
                        maxRows={6}
                        value={notes}
                        onChange={event => {
                            setNotes(event.target.value)
                            localStorage.setItem(toString(), event.target.value)
                        }}
                        />
                </Accordion>
            </AccordionDetails>
        </React.Fragment>
    )

}

export default School