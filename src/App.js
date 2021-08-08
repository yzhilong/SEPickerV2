import React, { Component, useState, useEffect } from "react"
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import ReactGa from 'react-ga'
import Favourites from "./pages/Favourites"
import NavBar from "./components/NavBar"
import Selector from "./pages/Selector"
// import 'bootstrap/dist/css/bootstrap

import makeStyles from '@material-ui/core/styles/makeStyles';

import { TableHead, TableRow, TableCell, TableContainer, Paper, TextField, Grid, Checkbox, FormControlLabel, Tooltip, Box, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    app: {
        width: "100%",
        minWidth: 550,
        backgroundColor: "#F6F6F6"
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

const scale = visualViewport.width < 550 ? visualViewport.width/550 : 1
const metaContent = "width=device-width,initial-scale=" + scale

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
    const [ title, setTitle ] = useState("SEPicker")
    document.title = title

    const classes = useStyles()

    const BenjaminsLink = "https://www.linkedin.com/in/benjamin-lee-b7975819a/"
    const ZhiLongsLink = "https://www.linkedin.com/in/zhi-long-yeo/"
    const githubPage = "https://github.com/yzhilong/SEPickerV2"
    

    useEffect(() => {
        ReactGa.initialize('UA-204358478-1')
        ReactGa.pageview('/')
        // console.log("GA")
    }, [])
    return (
        <div style={{height: "100vh", backgroundColor:"#F6F6F6"}}>
            <Helmet>
                <meta name="viewport" content={`${metaContent}`}/>
            </Helmet>
            <Grid className={classes.app} >
                <NavBar />
                <Route path="/" exact>
                    <Selector 
                        favourites={favourites}
                        setFavourites={setFavourites}
                        setTitle={setTitle}
                    /> 
                </Route>
                <Route path="/favourites" exact>
                    <Favourites
                        favourites={favourites}
                        setFavourites={setFavourites}
                        setTitle={setTitle}
                    />
                </Route>
            </Grid>
            <div style={{backgroundColor: "#F6F6F6", paddingTop:"10px"}}><br/></div>
            <footer align="center" style={{position: "fixed", bottom: 0, borderTop: "1px solid rgb(150,150,150)"}} className={classes.app}>
                <Typography style={{fontSize: "80%", fontStyle: "italic", fontFamily: "Courier New", opacity: "100%"}}>
                    This website was created by <a href={BenjaminsLink}>Benjamin</a> and <a href={ZhiLongsLink}>Zhi Long</a>,
                    an overhaul of our <a href="https://github.com/tangboxuan/SEPicker">HackNRoll project</a>. 
                    {/* Checkout our code <a href={githubPage}>here!</a> */}
                </Typography>
            </footer>
        </div>
    )
}

export default App
