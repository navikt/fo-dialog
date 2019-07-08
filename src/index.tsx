import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
import {BrowserRouter as Router, Route, Link, RouteComponentProps} from "react-router-dom";
import {DialogOverview} from "./view/DialogOverview";
import RoutingTestComponent from "./RoutingTestComponent";

require('./mock');

const routing = (
    <Router>
        <div>
            <Route exact path={"/"} component={App}/>
            <Route path="/:id" component={App}/>
        </div>

    </Router>

);

ReactDOM.render(routing, document.getElementById('root'));
