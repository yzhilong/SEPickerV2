import React, { useState } from "react"
import './EssentialModuleSelector.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, Chip } from '@material-ui/core'

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

function EssentialModulesSelector(props) {

    const classes = useStyles();
    function onClickModule(event, val) {
        props.stateSetter(val.map(mod => mod.modCode))
    }

    const defaultValue = "selectedEssentialModules" in localStorage
        ? JSON.parse(localStorage.getItem("selectedEssentialModules"))
        : []

    for (let i = 0; i < defaultValue.length; i++) {
        defaultValue[i] = {
            modCode: defaultValue[i], 
            module: defaultValue[i] + " " + moduleCodeTitleMappings[defaultValue[i]]}
    }

    return (
        <Grid item xs={12} className={classes.root}>
            <Autocomplete
                autoHighlight={true}
                onChange={onClickModule}
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={modules}
                getOptionLabel={(options) => options.module}
                defaultValue={defaultValue}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            style={{backgroundColor: "#F6F6F6", fontFamily: "Courier New"}}
                            variant="outlined"
                            label={option.module}
                            {...getTagProps({index})}    
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        variant="outlined" 
                        label={<div style={{fontFamily: "Courier New"}}>{"Essential Modules"}</div>} 
                    />
                )}
            />
        </Grid>
       
    );

      
}

export default EssentialModulesSelector