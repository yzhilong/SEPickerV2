import React from "react"
import University from "../University"

/*
TODO
    1. Conditional rendering to show if only continent/country has been selected
    2. Load selected options into props
        2.1 Results will be our point of entry into our algorithm to select universities
*/

function Results(props) {

    const result = props.result
    const universities = []
    let i = 0
    for (const continent in result) {
        // console.log(continent)
        for (const country in result[continent]) {
            // console.log("    " + country)
            for (const school in result[continent][country]) {
                // console.log("        " + school)
                universities[i] = <University 
                    mappings={result[continent][country][school]["mappings"]} 
                    name={school}
                    numMappable={result[continent][country][school]["num_mappable"]}
                />
                i++;
            }
        }
    }


    return (
        <div className="Results">
            {universities}
            {/* {<University 
                essentialModules={["ESSENTIALMOD1", "ESSENTIALMOD2"]} 
                optionalModules={["OPTIONALMOD1","OPTIONALMOD2"]} 
                name="PLACEHOLDER_UNI_NAME"/>} */}
        </div>
    )
}

export default Results