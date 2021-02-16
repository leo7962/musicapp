import React, { useState } from 'react'
import "./Settings.scss";

export default function Settings(props) {
    const { user } = props;

    console.log(props);

    return (
        <div className="settings">
            <h1>Hello Settings</h1>
        </div>
    );
}
