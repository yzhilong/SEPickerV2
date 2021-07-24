import React, {useState} from "react"
import Multiselect from "multiselect-react-dropdown"
import nextId from 'react-id-generator'

function CountrySelector(props) {
    const countries = [
        {name: 'Australia', id: nextId()},
        {name: 'England', id: nextId()},
        {name: 'Singapore', id: nextId()},
        {name: 'New Zealand', id: nextId()}
    ]

    const [selectedCountries, setSelectedCountries] = useState(new Set())

    function onSelectCountry(selectedList, selectedItem) {
        setSelectedCountries(prevState => new Set([...prevState, selectedItem.name]));
    }

    function onRemoveCountry(selectedList, removedItem) {
        setSelectedCountries(prevState => {
            prevState.delete(removedItem.name);
            return new Set([...prevState]);
        })
    }

    return (
        <React.Fragment>
            <h3>Country</h3>
            <Multiselect
            options={countries} displayValue={"name"} onSelect={onSelectCountry} 
            onRemove={onRemoveCountry} closeOnSelect={false}
            />
            {selectedCountries}
        </React.Fragment>
    )
}

export default CountrySelector