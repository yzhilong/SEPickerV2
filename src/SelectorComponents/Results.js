import React from "react"
import University from "../University"

/*
TODO
    1. Conditional rendering to show if only continent/country has been selected
    2. Load selected options into props
        2.1 Results will be our point of entry into our algorithm to select universities
*/

function Results(props) {
    return (
        <div className="Results">
            <University 
                essentialModules={["ESSENTIALMOD1", "ESSENTIALMOD2"]} 
                optionalModules={["OPTIONALMOD1","OPTIONALMOD2"]} 
                name="PLACEHOLDER_UNI_NAME"/>
        </div>
    )
}

export default Results