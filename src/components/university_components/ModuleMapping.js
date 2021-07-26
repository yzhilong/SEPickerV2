import React from "react"

//TODO display partner university module

function ModuleMapping(props) {
    const module = props.module
    const equivalent_modules = props.equivalent_modules















    const modules = new Array()
    for (let i = 0; i < props.modules.length; i++) {
        // const partnerUniversityModule = (...)
        modules[i] = <p>{props.modules[i]}</p>
    }

    return (
        <div className="ModuleMapping">
            {modules}
        </div>
    )

}

export default ModuleMapping