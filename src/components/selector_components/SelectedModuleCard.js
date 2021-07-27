import React from "react"
import "./SelectedModuleCard.css"
import { FaTimes } from "react-icons/fa";

function SelectedModuleCard(props) {
    return (
            <div class="selected-module-card">
                {props.children}
                <button onClick={props.onRemove.bind({module: props.children})} class="delete-module-button">
                    <FaTimes/>
                </button>
            </div>
    )
}

export default SelectedModuleCard