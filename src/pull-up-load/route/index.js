import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import createHistory from "history/createBrowserHistory";
const { renderRoutes } = require('react-router-config');
import routesConfig from './routesConfig';

const history = createHistory();
const route = () => <BrowserRouter history={history}>
    <Switch>
        {renderRoutes(routesConfig)}
    </Switch>
</BrowserRouter>;

export default route;