import React, { Component, useState } from "react"
import { Route, Switch } from 'react-router-dom'
import Favourites from "./pages/Favourites"
import NavBar from "./components/NavBar"
import Selector from "./pages/Selector"
// import 'bootstrap/dist/css/bootstrap.min.css'

import makeStyles from '@material-ui/core/styles/makeStyles';

import { TableHead, TableRow, TableCell, TableContainer, Paper, TextField, Grid, Checkbox, FormControlLabel, Tooltip, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    app: {
        width: "100%",
        minWidth: 550,
    },
    country: {
        width: '80%',
        justifyContent: "center",
        padding: theme.spacing(2),
        minWidth: 100,
        background: "#42a7f5",
    },
    tmp: {
        padding: theme.spacing(1),
        // minWidth: 200,
        // maxWidth: 500
    },
    favourites: {
        padding: theme.spacing(1),
        minWidth: 300,
        maxWidth: 720
    },
    school: {
        width: '100%',
        background: "#42f5a4",
        minWidth: 100,
        padding: theme.spacing(1),
    },
    moduleMappingTitle: {
        width: '100%',
        // minWidth: 200,
        background: "red"
    },
    moduleMappingPaper: {
        width: "100%",
        background: "orange",
        // minWidth: 200,
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

function App() {

    const [ page, setPage ] = useState("Selector")

    // favourites should be a set of strings, where each element is "uni_name, MOD1, MOD2, ..., MODn"
    // modules must be in sorted order


    let favouriteNames = null
    if ("favouriteNames" in localStorage) {
        favouriteNames = JSON.parse(localStorage.getItem("favouriteNames"))

    } else {
        favouriteNames = []
        localStorage.setItem("favouriteNames", JSON.stringify(favouriteNames))
    }

    const [ favourites, setFavourites ] = useState(favouriteNames)

    const classes = useStyles()

    const BenjaminsLink = "https://www.linkedin.com/in/benjamin-lee-b7975819a/"
    const ZhiLongsLink = "https://www.linkedin.com/in/zhi-long-yeo/"
    const githubPage = "https://github.com/yzhilong/SEPickerV2"

    return (
        <div style={{backgroundColor: "#222324"}}>
            <Grid className={classes.app}>
                <NavBar />
                <Route path="/" exact>
                    <Selector 
                        favourites={favourites}
                        setFavourites={setFavourites}
                    /> 
                </Route>
                {/* <Route path ="/department" exact>
                    TODO
                </Route> */}
                <Route path="/favourites" exact>
                    <Favourites
                        favourites={favourites}
                        setFavourites={setFavourites}
                    />
                </Route>
                {/* {page === "Selector" 
                    ? <Selector 
                        favourites={favourites}
                        setFavourites={setFavourites}
                        /> 
                    : page === "Favourites"
                    ? <Favourites
                        favourites={favourites}
                        setFavourites={setFavourites}/>
                    : page === "Department"
                    ? null
                    : null
                } */}
            </Grid>
            <footer align="center" style={{position: "relative", bottom: 0}} className={classes.app}>
                <Typography style={{fontSize: "80%", fontStyle: "italic", color: "white"}}>
                    This website was created by <a href={BenjaminsLink}>Benjamin</a> and <a href={ZhiLongsLink}>Zhi Long</a>,
                    an overhaul of our <a href="https://github.com/tangboxuan/SEPicker">HackNRoll project</a>. 
                    Checkout our code <a href={githubPage}>here!</a>
                </Typography>
            </footer>
        </div>
    )
}

export default App
