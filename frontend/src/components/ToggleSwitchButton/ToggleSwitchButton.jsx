import { useState } from 'react';
import React from "react";
import './ToggleSwitchButton.css';

const ToggleSwitchButton = ({isShowingLoginButtons, handleToggleSwitchChange}) => {

    return (
        <label className="switch">
        <input type="checkbox" onChange={handleToggleSwitchChange}/>
        <span className="slider"></span>
        </label>
    )
}

export default ToggleSwitchButton;