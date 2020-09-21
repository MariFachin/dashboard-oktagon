import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import "font-awesome/css/font-awesome.css";

import Template from './components/template/index'
import Home from './pages/home/home'
import Description from './pages/description/description'
import Edit from './pages/edit/edit'
import Action from './pages/action/action'

ReactDOM.render(
    <BrowserRouter>
        <Template />
        <Switch>
            <Route path="/" render={() => <Home />} exact />
            <Route path="/edit" render={() => <Edit />} />
            <Route path="/description" render={() => <Description />} />
            <Route path="/action" render={() => <Action />} />
        </Switch>
    </ BrowserRouter>,
    document.getElementById('root')
)