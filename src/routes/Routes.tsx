import React from 'react';
import { Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from 'pages/Home';
import Details from 'pages/Details';
import { DETAILS, HOME_PAGE } from './routeNames';

const Routes: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path={HOME_PAGE} component={Home} />
                <Route path={DETAILS} component={Details} />
                <Redirect from="/" to={HOME_PAGE} />
            </Switch>
        </Router>
    )
}

export default Routes;