import React, { useState, useEffect } from "react"
import School from "./School"
import makeStyles from '@material-ui/core/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';


function Country(props) {
    const { countryName, result, useStyles, modulesCodeTitleMappings } = props

    const [ open, setOpen ] = useState(false)
    let schools = []
    let i = 0
    for (const school in result) {
        schools[i] = school
        i++;
    }

    schools.sort((schl1, schl2) => {
        const numMappableDiff = result[schl2]["num_mappable"] - result[schl1]["num_mappable"]
        if (numMappableDiff != 0) {
            return numMappableDiff
        } else {
            return schl1.localeCompare(schl2)
        }
    })

    const classes = useStyles();
      

    return (
        // square={true} is bugged! We require this setting to get ROUNDED corners
        <Accordion 
            className={classes.country} 
            TransitionProps={{ unmountOnExit: true}} 
            component={Paper} 
            square={true}
        >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <div>
                    <Typography>{countryName}</Typography>
                    <Typography>{schools.length} school(s) available!</Typography>
                </div>
            </AccordionSummary>
                {schools.map(school => {return (
                            <School 
                                schoolName={school} 
                                result={result[school]} 
                                useStyles={useStyles}
                                modulesCodeTitleMappings={modulesCodeTitleMappings}/>
                    )})}
        </Accordion>
    )

}

export default Country