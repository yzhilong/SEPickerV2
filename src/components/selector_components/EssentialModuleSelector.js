import React, { useState } from "react"
import Multiselect from "multiselect-react-dropdown"
import SelectedModuleCard from "./SelectedModuleCard"
import './EssentialModuleSelector.css'
function EssentialModulesSelector(props) {
    const [selectedModules, setSelectedModules] = useState([])
    function selectEssentialModuleHandler(event) {
        setSelectedModules(prevState => [...prevState, event.target.value])
    }

    function removeModuleHandler() {
        console.log(this.module)
        setSelectedModules(prevState => prevState.filter(prevSelectedMod => prevSelectedMod != this.module))
    }

    return (
        <React.Fragment>
            <form>
                <div class="form-group">
                    <label for="essential-modules">Essential Modules</label>
                    <select class="form-select" id="essentialModulesSelect" onChange={selectEssentialModuleHandler}>
                        <option disabled="true" selected>Select Essential Modules</option>
                        <option value="CS1101S Programming Methodology I">CS1101S Programming Methodology I</option>
                        <option disabled="true" value="MA1101R Linear Algebra I">MA1101R Linear Algebra I</option>
                        <option value="IS1103 Ethics in Computing">IS1103 Ethics in Computing</option>
                        <option value="ES2660 Communication in the Information Age">ES2660 Communication in the Information Age</option>
                    </select>
                </div>
            </form>
            {selectedModules.map(module => <SelectedModuleCard onRemove={removeModuleHandler}>{module}</SelectedModuleCard>)}
      </React.Fragment>
    )
}

export default EssentialModulesSelector