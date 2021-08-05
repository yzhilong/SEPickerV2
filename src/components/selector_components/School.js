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
import { TableHead, TableRow, TableCell, TableContainer, Paper, TextField, Grid, Checkbox, FormControlLabel, Tooltip, Box } from "@material-ui/core";

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { LocalSeeOutlined } from "@material-ui/icons";

function School(props) {
    const { schoolName, result, useStyles, modulesCodeTitleMappings, setSchools } = props
    // result = {"mappings": {...}, "num_mappable": int}

    function toString() {
        return schoolName + Object.keys(result.mappings).join();
    }

    const [ open, setOpen ] = useState(false)

    const defaultNote = (toString()+"notes" in localStorage) ? localStorage.getItem(toString()+"notes") : ""
    const [ notes, setNotes ] = useState(defaultNote)


    // Not very sure why this fixes the bug
    let [ favourited, setFavourited ] = useState(toString() in localStorage)
    favourited = toString() in localStorage

    // console.log(toString())
    // console.log(toString() in localStorage ? "yes" : "no") // 1
    // console.log(favourited ? "yes2" : "no2") // 2

    function onFavHandler(event) {
        // console.log(toString() + favourited.toString())
        if (event.target.checked) {
            setFavourited(true)
            setNotes(notes)
            localStorage.setItem(toString(),JSON.stringify(result))
            const favouriteNames = JSON.parse(localStorage.getItem("favouriteNames"))
            favouriteNames[favouriteNames.length] = toString()
            // console.log(favouriteNames)
            localStorage.setItem(
                "favouriteNames", 
                JSON.stringify(favouriteNames)
            )

        } else {
            // console.log(toString() + favourited.toString())
            setFavourited(false)
            localStorage.removeItem(toString())

            const newFavouriteNames = JSON.parse(localStorage.getItem("favouriteNames")).filter(name => name != toString())
            localStorage.setItem(
                "favouriteNames", 
                JSON.stringify(newFavouriteNames)
            )
            if (setSchools !== undefined) {
                setSchools(newFavouriteNames)
            }
        }
    }

    const modules = []
    let i = 0
    for (const module in result["mappings"]) {
        modules[i] = module
        i++;
    }

    const classes = useStyles(); 
    const moduleMappings = modules.map(module => <ModuleMapping 
        moduleName={module} 
        result={result["mappings"][module]} 
        useStyles={useStyles}
        modulesCodeTitleMappings={modulesCodeTitleMappings}/>)

    // console.log(favourited + " " + toString())

    function showModules() {
        if (modules.length === 1) return modules[0]

        let output = ""
        for (let i = 0; i < modules.length - 1; i++) {
            module = modules[i]
            output += ", " + module
        }
        output += " and " + modules[modules.length - 1]
        return output.slice(2,output.length)
    }

    return (
        <Grid container item xs={12}>
            <Accordion 
                className={classes.school} 
                TransitionProps={{ unmountOnExit: true }}
                component={Paper}
                elevation={2}
                square={true}
                >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Grid container item xs={12} alignItems="center" justifyContent="center">
                        <Grid item xs={1}>
                            <Tooltip title={favourited ? "Remove from Favourites" : "Add to Favourites"}>
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
                            </Tooltip>
                        </Grid>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={9}>
                            <Typography>
                                <Box fontWeight="fontWeightBold" fontSize="large">{schoolName}</Box>
                                <Box fontSize="small">{showModules()} available</Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Box 
                                style={{backgroundColor: "orange"}}
                                textAlign="center" 
                                component={Paper} 
                                square={false} 
                                width="auto" 
                                maxWidth={25}
                                minWidth={25}
                                maxHeight={25}
                                minHeight={25}
                            >
                                {result['num_mappable']}
                            </Box>
                        </Grid>
                    </Grid>
                </AccordionSummary>

                <Grid container item xs={12} spacing={0} justifyContent="center">
                    {moduleMappings}
                </Grid>

                <Grid container item xs={12} spacing={0} justifyContent="center" className={classes.tmp}>
                    <Grid item xs={12}>
                        <Box 
                            style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                                paddingBottom: "3px",
                                backgroundColor: "white"}}
                            component={Paper}
                        >
                            <TextField 
                            label="Notes" 
                            multiline={true}
                            className={classes.innerRoot}
                            maxRows={6}
                            value={notes}
                            onChange={event => {
                                setNotes(event.target.value)
                                localStorage.setItem(toString()+"notes", event.target.value)
                            }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Accordion>
        </Grid>
    )

}

export default School