import React, {useState} from "react"
import Multiselect from "multiselect-react-dropdown"
import * as Icon from "react-icons/fi"
import Checkbox from "react-custom-checkbox"
import nextId from 'react-id-generator'


function ContinentSelector(props) {
    const continents = [
        {name: 'Africa', id: 1}, 
        {name: 'Asia', id: 2}, 
        {name: 'Europe', id: 3}, 
        {name: 'North America', id: 4}, 
        {name: 'Oceania', id: 5}, 
        {name: 'South America', id: 6}
    ]
    const [selectedContinents, setSelectedContinents] = useState([])

    function onClickContinentHandler(continent) {
        setSelectedContinents(prevState => {
            if (prevState.includes(continent)) {
                return prevState.filter(item => item != continent);
            } else {
                return [...prevState, continent];
            }
        })
    }

    return (
        <React.Fragment>
            <div className="ContinentSelector">
                <h3>Continents</h3>
            </div>
            {continents.map(continent => 
                <Checkbox
                    key= {continent.id}
                    onChange = {event => onClickContinentHandler(continent.name)}
                    checked={false}
                    icon={
                        <div
                            style={{
                            display: "flex",
                            flex: 1,
                            backgroundColor: "#174A41",
                            alignSelf: "stretch",
                            }}
                        >
                            <Icon.FiCheck color="white" size={20} />
                        </div>
                    }
                    borderColor="#174A41"
                    borderWidth={0.000000000001}
                    borderRadius={20}
                    style={{ overflow: "hidden" }}
                    size={20}
                    label={continent.name}
                />)}
            {selectedContinents}
        </React.Fragment>
    )
}

export default ContinentSelector