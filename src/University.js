import React, { useState } from "react"
import ModuleMapping from "./UniversityComponents/ModuleMapping"

function University(props) {
    const modules = new Array()
    for (let i = 0; i < props.essentialModules.length + props.optionalModules.length; i++) {
        if (i < props.essentialModules.length) {
            modules[i] = props.essentialModules[i]
        } else {
            modules[i] = props.optionalModules[i + props.essentialModules.length]
        }
    }

    const [ notes, setNotes ] = useState("")

    return (
        <div className="University">
            <p>{props.name}</p>
            <ModuleMapping 
                essentialModules={props.essentialModules} 
                optionalModules={props.optionalModules}
            />
            <input type="text" onChange={event => setNotes(event.target.value)} value={notes} />
        </div>
    )
}

export default University