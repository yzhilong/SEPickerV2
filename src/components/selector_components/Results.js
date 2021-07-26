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
        for (const country in continent) {
            for (const school in country) {
                let j = 0
                const modules = []
                for (const module in school) {
                    modules[j] = module
                    j++
                }
                universities[i] = <University essentialModules={modules} optionalModules={[]} name={school} />
            }
        }
    }


    return (
        <div className="Results">
            {JSON.stringify(props.results)}
            {universities}
            {/* {<University 
                essentialModules={["ESSENTIALMOD1", "ESSENTIALMOD2"]} 
                optionalModules={["OPTIONALMOD1","OPTIONALMOD2"]} 
                name="PLACEHOLDER_UNI_NAME"/>} */}
        </div>
    )
}

export default Results