import React, { useState } from "react"
// import './CountrySelector.css'
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

const countriesArr = require("../../data/countries.json")
const countries = []
for (var i = 0; i < countriesArr.length; i++) {
    countries.push({country: countriesArr[i]})
}

function CountrySelector(props) {

    const classes = useStyles();
    const [selectedCountries, setSelectedCountries] = useState([])
    function onClickCountry(event, val) {
        setSelectedCountries(val.map(country => country.country))
    }

    return (
        <React.Fragment>
            <h2>Countries</h2>
            <div className={classes.root}>
                <Autocomplete
                onChange={onClickCountry}
                multiple
                limitTags={2}
                id="multiple-limit-tags"
                options={countries}
                getOptionLabel={(options) => options.country}
                defaultValue={[]}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Countries" placeholder="Continuous Typing Supported" />
                )}
                />
            </div>
            {selectedCountries}
        </React.Fragment>
    );

      
}

export default CountrySelector