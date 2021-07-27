import React, { useState } from "react"
// import './SchoolSelector.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
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

    return (
        <React.Fragment>
            <h2>Schools</h2>
            <div className={classes.root}>
                <Autocomplete
                    autoHighlight={true}
                    onChange={onClickSchool}
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={schools}
                    getOptionLabel={(option) => option.school}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Schools" placeholder="Continuous Typing Supported" />
                    )}
                />
            </div>
        </React.Fragment>
    );

      
}

export default SchoolSelector