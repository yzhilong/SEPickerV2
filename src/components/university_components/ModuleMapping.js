import React from "react"

//TODO display partner university module

function ModuleMapping(props) {
    const module = props.module
    const equivalentModules = props.equivalentModules

    
    let numEquivalentModules = 0
    for (const mod in equivalentModules) {
        numEquivalentModules++;
    }
    console.log(equivalentModules)
    console.log(numEquivalentModules)

    const exactlyEqual = (module in equivalentModules) && (numEquivalentModules === 1)

    let output = null
    if (exactlyEqual) {
        const equivalentModule = equivalentModules[module]
        output = (
            <div>
                {module} -> {JSON.stringify(equivalentModule)}
            </div>
        )
    } else {
        let equivs = ""
        const tail = []
        let i = 0
        for (const mod in equivalentModules) {
            equivs += mod + ", "
            tail[i] = <div>{mod} -> {JSON.stringify(equivalentModules[mod])}</div>
        }
        const head = <div>{module} is equivalent to [{equivs.slice(0,equivs.length - 2)}]</div>
        output = (
            <div>
                {head}
                {tail}
            </div>
        )
    }

    return (
        <div className="ModuleMapping" moduleCode={module}>
            {output}
        </div>
    )

}

export default ModuleMapping