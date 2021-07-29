import React, { useState, useEffect } from "react"
import ModuleMapping from "./ModuleMapping"

import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

function School(props) {
    const { schoolName, result, useStyles } = props
    // result = {"mappings": {...}, "num_mappable": int}

    const [ open, setOpen ] = useState(false)
    const modules = []
    let i = 0
    for (const module in result["mappings"]) {
        modules[i] = module
        i++;
    }
    console.log(result["mappings"])

    const classes = useStyles();

    return (
        <React.Fragment className={classes.root}>
            <AccordionDetails>
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <div>
                            <Typography>{schoolName}</Typography>
                            <Typography>{result['num_mappable']} module(s) available!</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Card>
                            <CardContent>
                                TESTagyhuihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                            </CardContent>
                            <CardContent>
                                TESTagyhuihhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
                            </CardContent>
                        </Card>
                    </AccordionDetails>
                </Accordion>
            </AccordionDetails>
        </React.Fragment>
    )

}

export default School