import React from 'react';
import { Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from 'pages/Home';
import Details from 'pages/Details';
import { DETAILS, HOME_PAGE } from './routeNames';

import './Routes.scss';

const Routes: React.FC = () => {
    return (
        <div className="routes">
            <Router>
                <div className="page">
                    <Switch>
                        <Route path={HOME_PAGE} component={Home} />
                        <Route path={DETAILS} component={Details} />
                        <Redirect from="/" to={HOME_PAGE} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default Routes;