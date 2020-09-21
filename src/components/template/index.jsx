import React from 'react'

import './styles.css'
import Logo from '../../assets/base64-logo.png'
import User from '../../assets/base64-thanos-original.jpg'

export default (props) => (
    <>
        <div className='header'>
            <img src={Logo} alt="logo" />
            <h2>Infinity War Campaign</h2>
        </div>
        <div className='dash'>
            <img src={User} alt="user" />
            <p>Dashboard</p>
            <a href="/">Campaigns</a>
        </div>
    </>
);