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
import { TableHead, TableRow, TableCell, TableContainer, Paper, TextField, Grid, Checkbox, FormControlLabel } from "@material-ui/core";

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { LocalSeeOutlined } from "@material-ui/icons";

function School(props) {
    const { schoolName, result, useStyles, modulesCodeTitleMappings } = props
    // result = {"mappings": {...}, "num_mappable": int}

    function toString() {
        return schoolName + Object.keys(result.mappings).join();
    }

    const [ open, setOpen ] = useState(false)

    const defaultNote = (toString()+"notes" in localStorage) ? localStorage.getItem(toString()+"notes") : ""
    const [ notes, setNotes ] = useState(defaultNote)

    const [ favourited, setFavourited ] = useState(toString() in localStorage)
    function onFavHandler(event) {
        if (event.target.checked) {
            setFavourited(true)
            setNotes(notes)
            localStorage.setItem(toString(),JSON.stringify(result))
        } else {
            setFavourited(false)
            localStorage.removeItem(toString())
        }
    }

    const modules = []
    let i = 0
    for (const module in result["mappings"]) {
        modules[i] = module
        i++;
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
                        <FormControlLabel
                            aria-label="Acknowledge"
                            onClick={(event) => event.stopPropagation()}
                            onFocus={(event) => event.stopPropagation()}
                            control={<Checkbox 
                                checkedIcon={<FavoriteIcon />} 
                                icon={<FavoriteBorderIcon />}
                                checked={favourited}
                                onChange={onFavHandler}
                                />}
                            label=""
                        />
                        <div>
                            <Typography>{schoolName}</Typography>
                            <Typography>{result['num_mappable']} module(s) available!</Typography>
                        </div>
                    </AccordionSummary>

                    <Grid container xs={12} spacing={0}>
                        <Grid container item xs={12} spacing={0} justifyContent="center" alignContent="center">
                            <Grid item xs={6}>
                                <div style={{border: "solid 0px blue"}}>NUS Module</div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{border: "solid 0px blue"}}>Partner University Module</div>
                            </Grid>
                        </Grid>
                        {modules.map(module => <ModuleMapping 
                                            moduleName={module} 
                                            result={result["mappings"][module]} 
                                            useStyles={useStyles}
                                            modulesCodeTitleMappings={modulesCodeTitleMappings}/>)}
                    </Grid>
                    <TextField 
                        label="Notes" 
                        multiline={true}
                        className={classes.innerRoot}
                        maxRows={6}
                        value={notes}
                        component={Paper}
                        onChange={event => {
                            setNotes(event.target.value)
                            localStorage.setItem(toString()+"notes", event.target.value)
                        }}
                        />
                </Accordion>
            </AccordionDetails>
        </React.Fragment>
    )

}

export default School