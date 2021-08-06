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
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'




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
        <Grid item container justifyContent="center">
                <Accordion 
                className={classes.country} 
                TransitionProps={{ unmountOnExit: true}} 
                component={Paper}
                elevation={3}
                square={true}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <div>
                            <Typography>
                                <Box style={{fontFamily: "Georgia, sans-serif", fontWeight:"bold", fontSize:"18px" }}>{countryName}</Box>
                                <Box fontSize="12px" style={{fontFamily: "Courier New"}}>{schools.length} school(s) available!</Box>
                            </Typography>
                        {/* <Typography><Box fontWeight="fontWeightBold">{countryName}</Box></Typography>
                        <Typography>{schools.length} school(s) available!</Typography> */}
                    </div>
                </AccordionSummary>
                    <Grid item container justifyContent="center" spacing={1} xs={12}>
                        {schools.map(school => {return (
                                    <School 
                                        schoolName={school} 
                                        result={result[school]} 
                                        useStyles={useStyles}
                                        modulesCodeTitleMappings={modulesCodeTitleMappings}/>
                            )})}
                    </Grid>
            </Accordion>
        </Grid>
    )

}

export default Country