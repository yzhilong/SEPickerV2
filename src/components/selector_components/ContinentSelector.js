import React, {useState} from "react"
import Multiselect from "multiselect-react-dropdown"
import * as Icon from "react-icons/fi"
// import Checkbox from "react-custom-checkbox"
import nextId from 'react-id-generator'
import { FormGroup, FormControlLabel, Checkbox, Grid, Typography } from '@material-ui/core'


function ContinentSelector(props) {
    const continents = [
        {name: 'Africa', label: 'Africa', id: 1}, 
        {name: 'Asia', label: 'Asia', id: 2}, 
        {name: 'Europe', label: 'Europe', id: 3}, 
        {name: 'North America', label: 'N. America', id: 4}, 
        {name: 'Oceania', label: 'Oceania', id: 5}, 
        {name: 'South America', label: 'S. America', id: 6}
    ]
    
    // const [selectedContinents, setSelectedContinents] = useState([])
    const selectedContinents = "selectedContinents" in localStorage
        ? JSON.parse(localStorage.getItem("selectedContinents"))
        : []

    function onClickContinentHandler(continent) {
        props.stateSetter(prevState => {
            if (prevState.includes(continent)) {
                return prevState.filter(item => item != continent);
            } else {
                return [...prevState, continent];
            }
        })
    }

    return (
        <React.Fragment>
            {continents.slice(0, 6).map(continent =>
                <Grid item xs={4}>
                    <FormControlLabel
                        control={<Checkbox checked={props.state.includes(continent.name)} onChange={(event)=>(onClickContinentHandler(event.target.name))} name={continent.name} />}
                        label={<div style={{fontFamily: "Courier New"}}>{continent.label}</div>}
                    />
                </Grid>
            )}
        </React.Fragment>
        // <React.Fragment>
        //     <div className="ContinentSelector">
        //         <h3>Continents</h3>
        //     </div>
        //     {continents.map(continent => 
        //         <Checkbox
        //             key= {continent.id}
        //             onChange = {event => onClickContinentHandler(continent.name)}
        //             checked={false}
        //             icon={
        //                 <div
        //                     style={{
        //                     display: "flex",
        //                     flex: 1,
        //                     backgroundColor: "#174A41",
        //                     alignSelf: "stretch",
        //                     }}
        //                 >
        //                     <Icon.FiCheck color="white" size={20} />
        //                 </div>
        //             }
        //             borderColor="#174A41"
        //             borderWidth={0.000000000001}
        //             borderRadius={20}
        //             style={{ overflow: "hidden" }}
        //             size={20}
        //             label={continent.name}
        //         />)}
        //     {selectedContinents}
        // </React.Fragment>
    )
}

export default ContinentSelector