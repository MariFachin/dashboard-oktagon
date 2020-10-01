import React from 'react'
import { Link } from "react-router-dom";


import './edit.css'
import SpiderMan from '../../assets/spiderman.jpg'
import White from '../../assets/white.jpg'

export default (props) => (
    <div className="create">
        <div className="all-content" >
            <h2>Let's get started</h2>
            <h3>1. Which Hero is starring in this campaign?</h3>
            <p>Don't see the HERO you want to use ? Add new HERO </p>
            <div className="upload">
                <img src={SpiderMan} alt="spiderman" />
                <img src={White} alt="white" />
                <img src={White} alt="white" />
            </div>
            <h3>2. Whats is the title of the campaign?</h3>
            <input type="text" id="txt-1" placeholder="Infinity War Campaign" />
            <h3>3. Write a brief description of the campaign.</h3>
            <input type="text" id="txt-2" placeholder="Infinity War Campaign description..." />
            <h3>4.When wil the campaign start and end? This can be update latter</h3>
            <button className="date-btn">Choose date range</button>
            <div className="last-btn">
                <Link to="/" className="cancel-btn">Cancel</Link>
                <Link to="/description" className="submit-btn">Create campaign</Link>
            </div>
        </div>
    </div>
);