import React from "react"
import Multiselect from "multiselect-react-dropdown"
import * as Icon from "react-icons/fi"
import Checkbox from "react-custom-checkbox"


function ContinentSelector(props) {
    const continents = ['Africa', 'Asia', 'Europe', 'North America', 'Oceania', 'South America']
    function onSelectHandler(continent) {
        console.log(continent);
    }
    return (
        <React.Fragment>
            <div className="ContinentSelector">
                <h3>Continents</h3>
            </div>
            {continents.map(continent => 
                <Checkbox
                    onChange = {event => onSelectHandler(continent)}
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
                    label={continent}
                />)}
        </React.Fragment>
    )
}

export default ContinentSelector