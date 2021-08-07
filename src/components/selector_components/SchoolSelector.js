import React, { useState } from "react"
// import './SchoolSelector.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Chip } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        marginTop: 10,
        '& > * + *': {
        marginTop: theme.spacing(3),
        },
    },
    }));

const schoolsArr = require("../../data/schools.json")
const schools = []
for (var i = 0; i < schoolsArr.length; i++) {
    schools.push({school: schoolsArr[i]})
}

function SchoolSelector(props) {

    const classes = useStyles();
    function onClickSchool(event, val) {
        props.stateSetter(val.map(school => school.school))
    }

    const defaultValue = "selectedSchools" in localStorage
        ? JSON.parse(localStorage.getItem("selectedSchools"))
        : []
    for (let i = 0; i < defaultValue.length; i++) {
        defaultValue[i] = {school: defaultValue[i]}
    }

    return (
        <Grid item xs={12} className={classes.root}>
            <Autocomplete
                autoHighlight={true}
                onChange={onClickSchool}
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={schools}
                getOptionLabel={(option) => option.school}
                defaultValue={defaultValue}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            style={{backgroundColor: "#F6F6F6", fontFamily: "Courier New"}}
                            variant="outlined"
                            label={option.school}
                            {...getTagProps({index})}    
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        variant="outlined" 
                        label={<div style={{fontFamily: "Courier New"}}>{"Schools"}</div>} 
                    />
                )}
            />
        </Grid>
    );

      
}

export default SchoolSelector