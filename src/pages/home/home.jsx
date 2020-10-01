import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Moment from 'react-moment';

import { Link } from "react-router-dom";

import './home.css'

const Home = (props) => {

    const [idCampaign, setId] = useState({ id: '' });
    const [state, setState] = useState({
        campaigns: []
    });

    useEffect(() => {
        axios.get(`http://devserver.oktagongames.com:5000/api/campaign`)
            .then(res => {
                const campaigns = res.data;
                setState({ campaigns });
                setId({ id: res.data._id })
            })
    }, [idCampaign.id]);

    const handleRemove = id => {
        axios.delete(`http://devserver.oktagongames.com:5000/api/campaign/${id}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                window.location.reload(false);
                // const campaigns = this.state.campaigns.filter(campaign => campaign.id !== id);
                // this.setState({ campaigns: campaigns });
            })
        // remove item
    }

    return (

        <div className='home'>
            <div className='section-1'>
                <h2>Campaigns</h2>
                <div id="divSearch">
                    <i className="fa fa-search"></i>
                    <input type="text" id="txtSearch" placeholder="Search for a campaign" />
                </div>
                <Link to="/create" className="button">New Campaign</Link>
            </div>
            <div className='section-2'>
                <ul className="campaigns">
                    <li>Campaign</li>
                    <li>Start Date</li>
                    <li>End Date</li>
                    <li>Status</li>
                    <li>Create</li>
                    <i></i>
                    <i></i>
                </ul>

                {state.campaigns.map(campaign =>
                    <ul className="campaigns decoration" key={campaign._id}>
                        <li>{campaign.title}</li>
                        <li>
                            <Moment format="YYYY/MM/DD">
                                {campaign.dateBegin}
                            </Moment>
                        </li>
                        <li>
                            <Moment format="YYYY/MM/DD">
                                {campaign.dateEnd}
                            </Moment>
                        </li>
                        <li>{campaign.description}</li>
                        <li>
                            <Moment parse="YYYY-MM-DD HH:mm">
                                {campaign.createdAt}
                            </Moment>
                        </li>
                        <i onClick={() => handleRemove(campaign._id)} className="fa fa-trash"></i>
                        <Link to={"/edit/" + campaign._id} className="edit-btn"><i className="fa fa-clone"></i> </Link>
                    </ul>
                )}

            </div>
        </div >
    );

}
export default Home;