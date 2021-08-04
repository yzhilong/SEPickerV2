import React, { useState } from "react"
// import './CountrySelector.css'
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        marginTop: 10,
        '& > * + *': {
        marginTop: theme.spacing(3),
        },
    },
    }));

const countriesArr = require("../../data/countries.json")
const countries = []
for (var i = 0; i < countriesArr.length; i++) {
    countries.push({country: countriesArr[i]})
}

function CountrySelector(props) {

    const classes = useStyles();
    function onClickCountry(event, val) {
        props.stateSetter(val.map(country => country.country))
    }

    const defaultValue = "selectedCountries" in localStorage
        ? JSON.parse(localStorage.getItem("selectedCountries"))
        : []
    for (let i = 0; i < defaultValue.length; i++) {
        defaultValue[i] = {country: defaultValue[i]}
    }


    return (
        <Grid item xs={12} className={classes.root}>
            <Autocomplete
            autoHighlight={true}
            onChange={onClickCountry}
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={countries}
            getOptionLabel={(options) => options.country}
            defaultValue={defaultValue}
            renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Countries" placeholder="Continuous Typing Supported" />
            )}
            />
        </Grid>
    );

      
}

export default CountrySelector