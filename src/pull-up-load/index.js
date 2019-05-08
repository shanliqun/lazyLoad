import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './route';
import { Provider } from 'react-redux'
import configureStore from './store';
import commonGlobal from './util/commonGlobal';

Object.assign = require('object-assign');
require('es6-promise').polyfill();

const common = commonGlobal.getGlobal();
const initialState = common.__INITIALSTATE__ || {};
const store = configureStore(initialState);
const rootEle = document.getElementById('app');
ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>, rootEle);
