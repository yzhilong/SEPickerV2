import React, { useState } from "react"
import Multiselect from "multiselect-react-dropdown"
import './EssentialModuleSelector.css'
import nextId from 'react-id-generator'


function EssentialModulesSelector(props) {

    // const modulesArr = require("../../data/modules.json")
    // const modules = []
    // for (var i = 0; i < modulesArr.length; i++) {
    //     modules.push({name: modulesArr[i], id: i})
    // }
    // console.log("AA")
    console.log(props.modules)

    const [selectedModules, setSelectedModules] = useState(new Set())

    function onSelectEssentialModule(selectedList, selectedItem) {
        setSelectedModules(prevState => new Set([...prevState, selectedItem.name.split(" ")[0]]));
    }

    function onRemoveEssentialModule(selectedList, removedItem) {
        setSelectedModules(prevState => {
            prevState.delete(removedItem.name.split(" ")[0]);
            return new Set([...prevState]);
        })
    }

    return (
        <React.Fragment>
            <h3>Essential Modules</h3>
            <Multiselect
            options={props.modules} displayValue={"name"} onSelect={onSelectEssentialModule} 
            onRemove={onRemoveEssentialModule} closeOnSelect={false}
            />
            {selectedModules}
        </React.Fragment>
    )
}

export default EssentialModulesSelector