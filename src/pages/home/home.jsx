import React from 'react'
import { Link } from "react-router-dom";


import './home.css'

export default (props) => (
    <div className='home'>
        <div className='section-1'>
            <h2>Campaigns</h2>
            <div id="divSearch">
                <i class="fa fa-search"></i>
                <input type="text" id="txtSearch" placeholder="Search for a campaign" />
            </div>
            <Link to="/edit" className="button">New Campaign</Link>
        </div>
        <div className='section-2'>
            <ul className="campaigns">
                <li>Campaign</li>
                <li>Start Date</li>
                <li>End Date</li>
                <li>Status</li>
                <li>Buddy</li>
                <i></i>
                <i></i>
            </ul>
            <ul className="campaigns decoration">
                <li>Base Campaign</li>
                <li>1/1/18</li>
                <li>ONgoinge</li>
                <li>Live</li>
                <li>Peter</li>
                <i class="fa fa-trash"></i>
                <i class="fa fa-clone"></i>
            </ul>
        </div>
    </div >
);