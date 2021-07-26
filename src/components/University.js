import React, { useState } from "react"
import ModuleMapping from "./university_components/ModuleMapping"

function University(props) {

    const module_mappings = new Array()

    let i = 0
    for (const module in props.mappings) {
        module_mappings[i] = [module, props.mappings[module]]
    }


    const [ notes, setNotes ] = useState("")

    return (
        <div className="University">
            <p>{props.name} {props.num_mappable}</p>
            
{/* {            <ModuleMapping 
                nus_module_code = 
                modules={modules} 
            />} */}
            <input type="text" onChange={event => setNotes(event.target.value)} value={notes} />
        </div>
    )
}

export default University