import React, { useState, useEffect } from "react"
import University from "../University"
import School from "./School"
import makeStyles from '@material-ui/core/styles/makeStyles';

import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

function Country(props) {
    const { countryName, result, useStyles, modulesCodeTitleMappings } = props

    const [ open, setOpen ] = useState(false)
    let schools = []
    let i = 0
    for (const school in result) {
        schools[i] = [school, result[school]["num_mappable"]]
        i++;
    }

    schools.sort((schl1, schl2) => {
        const numMappableDiff = schl2[1] - schl1[1]
        if (numMappableDiff != 0) {
            return numMappableDiff
        } else {
            return schl1[0].localeCompare(schl2[0])
        }
    })

    const tmp = []
    for (let i = 0; i < schools.length; i++) {
        tmp[i] = schools[i][0]
    }
    schools = tmp

    const classes = useStyles();
      

    return (
        <Accordion className={classes.root}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
                <div className={classes.column}>
                    <Typography>{countryName}</Typography>
                    <Typography>{schools.length} school(s) available!</Typography>
                </div>
            </AccordionSummary>
                {schools.map(school => {return (
                        // <AccordionDetails className={classes.root}>
                            <School 
                                schoolName={school} 
                                result={result[school]} 
                                useStyles={useStyles}
                                modulesCodeTitleMappings={modulesCodeTitleMappings}/>
                        // </AccordionDetails>
                    )})}
        </Accordion>
    )

}

export default Country