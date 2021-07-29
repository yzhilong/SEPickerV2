import React, { useState } from "react"
import ModuleMapping from "./university_components/ModuleMapping"

function University(props) {

    const moduleMappings = new Array()

    let i = 0
    for (const module in props.mappings) {
        moduleMappings[i] = <ModuleMapping module={module} equivalentModules={props.mappings[module]} />
        i++
    }


    const [ notes, setNotes ] = useState("")

    return (
        <div className="University">
            <p>
                {props.name}, {props.numMappable}
                {moduleMappings}
                <input type="text" onChange={event => setNotes(event.target.value)} value={notes} />
            </p>
        </div>
    )
}

export default University