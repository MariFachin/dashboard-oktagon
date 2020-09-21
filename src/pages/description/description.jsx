import React from 'react'
import { Link } from "react-router-dom";


import './description.css'
import SpiderMan from '../../assets/base64-spiderman.jpg'

export default (props) => (
    <div className="description">
        <div className="content-desc" >
            <div className="left">
                <h2>Infinity War<a href="/edit">Edit</a></h2>
                <p>Created by <span>You</span> on Feb. 10, 2018</p>
                <h3>Description <i class="fa fa-comments">0</i></h3>
                <p>Infinity War Campaign description...</p>
                <h3>Schedule <i class="fa fa-comments">0</i></h3>
                <p>Oct. 1, 2018 - Nov. 1, 2018</p>
                <h3>Actions <i class="fa fa-comments">0</i></h3>
                <p>No actions added yet.<a id='links' href="/edit">Add Onde?</a></p>
                <h3>Open Tasks <i class="fa fa-comments">0</i></h3>
                <p>No Tasks added yet</p>
                <div className="last-btn">
                    <Link to="/" className="cancel-btn">Cancel</Link>
                    <Link to="/action" className="submit-btn">Create action</Link>
                </div>
            </div>
            <div className="right">
                <img src={SpiderMan} alt="spiderman" />
                <i class="fa fa-comments">0</i>
            </div>
        </div>
    </div>
);