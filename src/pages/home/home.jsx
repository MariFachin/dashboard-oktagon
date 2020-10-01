import React from 'react'
import axios from 'axios';
import Moment from 'react-moment';

import { Link } from "react-router-dom";

import './home.css'

export default class Home extends React.Component {

    state = {
        campaigns: [],
    }

    componentDidMount() {
        axios.get(`http://devserver.oktagongames.com:5000/api/campaign`)
            .then(res => {
                const campaigns = res.data;
                this.setState({ campaigns });
            })
    }

    // handleChange = event => {
    //     this.setState({ id: event.target.value });
    // }

    // handleSubmit = event => {
    //     this.setState({ id: event.target.value });
    //     event.preventDefault();

    //     axios.delete(`http://devserver.oktagongames.com:5000/api/campaign/${this.state.id}`)
    //         .then(res => {
    //             console.log(res);
    //         })
    // }


    handleRemove = id => {
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


    render() {
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

                    {this.state.campaigns.map(campaign =>
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
                            <i onClick={() => this.handleRemove(campaign._id)} className="fa fa-trash"></i>
                            <i className="fa fa-clone"></i>
                        </ul>
                    )}

                </div>
            </div >
        )
    }
}