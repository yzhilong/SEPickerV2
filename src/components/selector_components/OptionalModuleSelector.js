import React, { useState } from "react"
import './OptionalModuleSelector.css'
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

const modulesArr = require("../../data/reducedModules.json")
const modules = []
for (var i = 0; i < modulesArr.length; i++) {
    modules.push({module: modulesArr[i], modCode: modulesArr[i].split(" ")[0]})
}

function OptionalModulesSelector(props) {

    const classes = useStyles();
    function onClickModule(event, val) {
        props.stateSetter(val.map(mod => mod.modCode));
    }

    return (
        <React.Fragment>
            <h2>Optional Modules</h2>
            <div className={classes.root}>
                <Autocomplete
                    autoHighlight={true}
                    onChange={onClickModule}
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={modules}
                    getOptionLabel={(options) => options.module}
                    defaultValue={[]}
                    renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="Optional Modules" placeholder="Continuous Typing Supported" />
                    )}
                />
            </div>
        </React.Fragment>
    );

      
}

export default OptionalModulesSelector