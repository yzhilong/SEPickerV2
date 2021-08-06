import React, { useState } from "react"
import School from "../components/selector_components/School"
import {makeStyles, Grid, Paper, Typography } from "@material-ui/core"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const useStyles = makeStyles((theme) => ({
    country: {
        width: '80%',
        justifyContent: "center",
        padding: theme.spacing(2),
        minWidth: 400,
        background: "#42a7f5",
    },
    tmp: {
        padding: theme.spacing(1),
        minWidth: 300
    },
    // favourites: {
    //     // padding: theme.spacing(1),
    //     // minWidth: 600,
    //     justifyContent: "center",
    //     maxWidth: "80%"
    // },
    school: {
        width: '100%',
        background: "#42f5a4",
        minWidth: 350,
        padding: theme.spacing(1),
    },
    moduleMappingTitle: {
        width: '100%',
        minWidth: 200,
        background: "red"
    },
    moduleMappingPaper: {
        width: "100%",
        background: "orange",
        minWidth: 200,
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

    const classes = useStyles()

    function func(school, index) {
        const result = JSON.parse(localStorage.getItem(school))

        let endPoint = school.length
        for (let i = school.length; i > 0; i--) {
            if (school.slice(i-1,i).toUpperCase() !== school.slice(i-1,i)) {
                endPoint = i
                break
            }
        }
        const schoolName = school.slice(0,endPoint)
        console.log(school)
        return (
            <Draggable key={school} draggableId={school} index={index}>
                {provided => (
                    <Grid container item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <School 
                            schoolName={schoolName} 
                            result={result} 
                            useStyles={useStyles}
                            modulesCodeTitleMappings={modulesCodeTitleMappings}
                            setSchools={setSchools}
                        />
                    </Grid>
                )}
            </Draggable>
        )
    }

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        console.log(result)
        const items = Array.from(schools);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setSchools(items);
        localStorage.setItem("favouriteNames",JSON.stringify(items))
      }
    
    return (
        <Grid container xs={12} justifyContent="center">
            <Grid container justifyContent="center" style={{maxWidth: "80%", paddingTop: "1vh"}}>
                <Grid container item xs={12} justifyContent="center">
                    <Typography variant="h5" style={{fontWeight: "bold"}}>Drag and drop to rank!</Typography>
                    <br></br>
                </Grid>
                <Grid container item xs={12} justifyContent="center">
                    <br></br>
                </Grid>
                <Grid container item xs={12} style={{maxWidth: "100%"}} justifyContent="center">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="favs">
                        {(provided) => (
                            <Grid 
                                container 
                                item 
                                xs={11} 
                                justifyContent="center" 
                                spacing={3} 
                                component={Paper} 
                                className={classes.favourites}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{marginBottom:"2%", backgroundColor: "brown", padding: "2%"}}
                            >
                                {schools.length == 0 
                                    ? <Typography variant="h5" style={{fontWeight: "bold"}}>No school favourited yet</Typography>
                                    : <React.Fragment>
                                       {schools.map(func)}
                                       {provided.placeholder}
                                      </React.Fragment>}
                            </Grid>
                            
                        )}
                        </Droppable>
                    </DragDropContext>
                </Grid>
             </Grid>
        </Grid>
    )
    
}

export default Favourites