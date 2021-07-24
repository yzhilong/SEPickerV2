import React, { useState } from "react"
import Multiselect from "multiselect-react-dropdown"
import nextId from 'react-id-generator'

function SchoolSelector(props) {
    const schools = [
        {name: 'NTU', id: nextId()},
        {name: 'Tsinghua University', id: nextId()},
        {name: 'UCL', id: nextId()},
        {name: 'Harvard University', id: nextId()}
    ]

    const [selectedSchools, setSelectedSchools] = useState(new Set())

    function onSelectSchool(selectedList, selectedItem) {
        setSelectedSchools(prevState => new Set([...prevState, selectedItem.name]));
    }

    function onRemoveSchool(selectedList, removedItem) {
        setSelectedSchools(prevState => {
            prevState.delete(removedItem.name);
            return new Set([...prevState]);
        })
    }

    return (
        <React.Fragment>
            <h3>School</h3>
            <Multiselect
            options={schools} displayValue={"name"} onSelect={onSelectSchool} 
            onRemove={onRemoveSchool} closeOnSelect={false}
            />
            {selectedSchools}
        </React.Fragment>
    )
}

export default SchoolSelector