import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import Moment from 'react-moment';

import './description.css'
import SpiderMan from '../../assets/spiderman.jpg'

const Description = (props) => {
    const [state, setState] = useState({
        campaigns: []
    });
    const [idRoute, setIdRoute] = useState(
        {
            id: props.match.params.id,
        }
    );

    console.log(idRoute.id)

    useEffect(() => {
        axios.get(`http://devserver.oktagongames.com:5000/api/campaign/${idRoute.id}`)
            .then(res => {
                const campaigns = res.data;
                setState({ campaigns });
                console.log(campaigns)
            })
    }, [idRoute.id]);


    return (
        <div className="description">
            <div className="content-desc" >
                <div className="left">
                    <h2>{state.campaigns.title}<a id='links' href={"/edit/" + idRoute.id}>Edit</a></h2>
                    <p>Created by <span>You</span> on
                        <Moment style={{ marginLeft: '6px' }} format="D MMM YYYY" withTitle>
                            {state.campaigns.createdAt}
                        </Moment>
                    </p>
                    <h3>Description <i className="fa fa-comments">0</i></h3>
                    <p>{state.campaigns.description}</p>
                    <h3>Schedule <i className="fa fa-comments">0</i></h3>
                    <p>
                        <Moment format="MMM. D, YYYY -" withTitle>
                            {state.campaigns.dateBegin}
                        </Moment>
                        <Moment format=" MMM. D, YYYY" withTitle>
                            {state.campaigns.dateEnd}
                        </Moment>
                    </p>
                    <h3>Actions <i className="fa fa-comments">0</i></h3>
                    <p>No actions added yet.<a id='links' href="/edit">Add One?</a></p>
                    <h3>Open Tasks <i className="fa fa-comments">0</i></h3>
                    <p>No Tasks added yet</p>
                    <div className="last-btn">
                        <Link to="/" className="cancel-btn">Cancel</Link>
                        <Link to={"/action/" + idRoute.id} className="submit-btn">Create action</Link>
                    </div>
                </div>
                <div className="right">
                    <img src={SpiderMan} alt="spiderman" />
                    <i className="fa fa-comments">0</i>
                </div>
            </div>
        </div>

    );
}
export default Description;