import React, { useState } from "react"
import School from "../components/selector_components/School"
import {makeStyles, Grid, Paper } from "@material-ui/core"
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
    favourites: {
        padding: theme.spacing(1),
        minWidth: 600,
        maxWidth: "70%"
    },
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
        return (
            <Draggable key={school} draggableId={school} index={index}>
                {/* {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div>
                            <img src={"https://ae01.alicdn.com/kf/HTB116_kXK6sK1RjSsrbq6xbDXXa0/Four-Pieces-Arrow-WASD-Aluminum-Metal-Novelty-Keycaps-OEM-Profile-for-Cherry-MX-Switches-Mechanical-Keyboard.jpg_50x50.jpg_.webp"} />
                        </div>
                    </li>
                )} */}
                
                
                
                {provided => (
                    <Grid container item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <School 
                            schoolName={school} 
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

    schools.map((school, index) => console.log(index))
    
    return (
        <Grid container xs={12} justifyContent="center" spacing={3}>
            {/* <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
            </ul> */}
            <DragDropContext>
                <Droppable droppableId="favs">
                {(provided) => (
                    // <ul {...provided.droppableProps} ref={provided.innerRef}>
                    //     {schools.map((school, index) => func(school, index))}
                    // </ul>
                    <Grid 
                        container 
                        item xs={11} 
                        justifyContent="center" 
                        spacing={3} 
                        component={Paper} 
                        className={classes.favourites}

                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {schools.map(func)}
                        {provided.placeholder}
                    </Grid>
                    
                )}
                </Droppable>
            </DragDropContext>
        </Grid>
    )
    
}

export default Favourites

// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const finalSpaceCharacters = [
//   {
//     id: 'gary',
//     name: 'Gary Goodspeed',
//     thumb: '/images/gary.png'
//   },
//   {
//     id: 'cato',
//     name: 'Little Cato',
//     thumb: '/images/cato.png'
//   },
//   {
//     id: 'kvn',
//     name: 'KVN',
//     thumb: '/images/kvn.png'
//   },
//   {
//     id: 'mooncake',
//     name: 'Mooncake',
//     thumb: '/images/mooncake.png'
//   },
//   {
//     id: 'quinn',
//     name: 'Quinn Ergon',
//     thumb: '/images/quinn.png'
//   }
// ]

// function App() {
//   const [characters, updateCharacters] = useState(finalSpaceCharacters);

// //   function handleOnDragEnd(result) {
// //     if (!result.destination) return;

// //     const items = Array.from(characters);
// //     const [reorderedItem] = items.splice(result.source.index, 1);
// //     items.splice(result.destination.index, 0, reorderedItem);

// //     updateCharacters(items);
// //   }

//   return (
//     <div>
//       <header>
//         <h1>Final Space Characters</h1>
//         <DragDropContext>
//           <Droppable droppableId="characters">
//             {(provided) => (
//               <ul {...provided.droppableProps} ref={provided.innerRef}>
//                 {characters.map(({id, name, thumb}, index) => {
//                   return (
//                     <Draggable key={id} draggableId={id} index={index}>
//                       {(provided) => (
//                         <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <div >
//                             <img src={thumb} alt={`${name} Thumb`} />
//                           </div>
//                           <p>
//                             { name }
//                           </p>
//                         </li>
//                       )}
//                     </Draggable>
//                   );
//                 })}
//                 {provided.placeholder}
//               </ul>
//             )}
//           </Droppable>
//         </DragDropContext>
//       </header>
//       <p>
//         Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
//       </p>
//     </div>
//   );
// }

// export default App;