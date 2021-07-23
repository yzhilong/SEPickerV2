import React, { useState } from "react"
import Multiselect from "multiselect-react-dropdown"
import './EssentialModuleSelector.css'
import nextId from 'react-id-generator'

function EssentialModulesSelector(props) {
    const modules = [
        {name: 'CS1101S Programming Methodology I', id: nextId()},
        {name: 'MA1101R Linear Algebra I', id: nextId()},
        {name: 'CS2103T Software Engineering', id: nextId()},
        {name: 'ST2131 Probability', id: nextId()}
    ]

    const [selectedModules, setSelectedModules] = useState(new Set())

    function onSelectEssentialModule(selectedList, selectedItem) {
        setSelectedModules(prevState => new Set([...prevState, selectedItem.name]));
    }

    function onRemoveEssentialModule(selectedList, removedItem) {
        setSelectedModules(prevState => {
            prevState.delete(removedItem.name);
            return new Set([...prevState]);
        })
    }

    return (
        <React.Fragment>
            <Multiselect
            options={modules} displayValue={"name"} onSelect={onSelectEssentialModule} 
            onRemove={onRemoveEssentialModule} closeOnSelect={false}
            />
            {selectedModules}
        </React.Fragment>
    )
}

export default EssentialModulesSelector