import React from "react"

//TODO display partner university module

function ModuleMapping(props) {
    const modules = new Array()
    for (let i = 0; i < props.essentialModules.length; i++) {
        // const partnerUniversityModule = (...)
        modules[i] = <p>{props.essentialModules[i]}</p>
    }
    const n = modules.length
    for (let i = 0; i < props.optionalModules.length; i++) {
        // const partnerUniversityModule = (...)
        modules[i+n] = <p>{props.optionalModules[i]}</p>
    }

    return (
        <div className="ModuleMapping">
            {modules}
        </div>
    )

}

export default ModuleMapping