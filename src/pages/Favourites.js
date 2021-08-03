import React, { useState } from "react"
import School from "../components/selector_components/School"
import {makeStyles, Grid, Paper } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    country: {
        width: '80%',
        justifyContent: "center",
        padding: theme.spacing(2),
        minWidth: 100,
        background: "#42a7f5",
    },
    tmp: {
        padding: theme.spacing(1),
    },
    school: {
        width: '100%',
        background: "#42f5a4",
        padding: theme.spacing(1),
    },
    moduleMappingTitle: {
        width: '100%',
        background: "red"
    },
    moduleMappingPaper: {
        width: "100%",
        background: "orange",
        padding: theme.spacing(1),
    },
    root: {
        width: '80%',
        minWidth: 500,
        background: 'blue',
    },
    innerRoot: {
        width: "100%",
    },
    }));

const modulesCodeTitleMappings = require("../data/moduleCodeTitleMappings.json")


function Favourites(props) {

    // REQUIRE LOGIC FOR SHOWING HOW TO HANDLE ELEMENTS IN props.favoruites
    const [ schools, setSchools ] = useState(JSON.parse(localStorage.getItem("favouriteNames")))


    function func(school) {
        const result = JSON.parse(localStorage.getItem(school))
        console.log(school)

        let endPoint = school.length
        for (let i = school.length; i > 0; i--) {
            if (school.slice(i-1,i).toUpperCase() !== school.slice(i-1,i)) {
                endPoint = i
                break
            }
        }
        school = school.slice(0,endPoint)
        console.log(school)

        return (<School 
                    schoolName={school} 
                    result={result} 
                    useStyles={useStyles}
                    modulesCodeTitleMappings={modulesCodeTitleMappings}
                    setSchools={setSchools}
            />)
    }

    
    return (
        <Grid container xs={12} justifyContent="center" spacing={3}>
            <Grid container item xs={11} justifyContent="center" spacing={3}>
                {schools.map(func)}
            </Grid>
        </Grid>
    )
    
}

export default Favourites