import React from 'react'
import { Link } from "react-router-dom";


import './action.css'

export default (props) => (
    <div className="action">
        <div className="all-content" >
            <h2>New Action</h2>
            <h3>1. Action Title: </h3>
            <input type="text" id="txt-1" placeholder="Infinity War Action" />
            <h3>2. Write a brief description of the action:</h3>
            <input type="text" id="txt-2" placeholder="Infinity War Action description..." />
            <h3>3.When wil the campaign start and end? This can be update latter</h3>
            <button className="date-btn">Choose date range</button>
            <div className="last-btn">
                <Link to="/" className="cancel-btn">Cancel</Link>
                <Link to="/" className="submit-btn">Create action</Link>
            </div>
        </div>
    </div>
);