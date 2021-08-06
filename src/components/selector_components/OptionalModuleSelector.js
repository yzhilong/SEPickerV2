import React, { useState } from "react"
import './OptionalModuleSelector.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        marginTop: 10,
    },
    }));

const modulesArr = require("../../data/reducedModules.json")
const moduleCodeTitleMappings = require("../../data/moduleCodeTitleMappings.json")

const modules = []
for (var i = 0; i < modulesArr.length; i++) {
    modules.push({module: modulesArr[i], modCode: modulesArr[i].split(" ")[0]})
}

function OptionalModulesSelector(props) {

    const classes = useStyles();
    function onClickModule(event, val) {
        props.stateSetter(val.map(mod => mod.modCode));
    }

    const defaultValue = "selectedOptionalModules" in localStorage
    ? JSON.parse(localStorage.getItem("selectedOptionalModules"))
    : []

    for (let i = 0; i < defaultValue.length; i++) {
        defaultValue[i] = {
            modCode: defaultValue[i], 
            module: defaultValue[i] + " " + moduleCodeTitleMappings[defaultValue[i]]}
    }

    return (
        <Grid item xs={12} className={classes.root}>
            <Autocomplete
                fontFamily="Courier New"
                autoHighlight={true}
                // style={{label: {fontFamily: "Courier New"}}}
                onChange={onClickModule}
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={modules}
                getOptionLabel={(options) => options.module}
                // renderOption={o => <div style={{fontFamily: "Courier New"}}>{o.module}</div>}
                defaultValue={defaultValue}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        // style={{fontFamily: "Courier New"}}
                        variant="outlined" 
                        label={<div style={{fontFamily: "Courier New"}}>{"Optional Modules"}</div>} 
                        placeholder="Hit enter to select"
                    />
                )}
            />
        </Grid>
    );

      
}

export default OptionalModulesSelector