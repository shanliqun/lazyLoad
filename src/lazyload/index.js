import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './route';

Object.assign = require('object-assign');
require('es6-promise').polyfill();

const rootEle = document.getElementById('app');

const render = function() {
    ReactDOM.render(
        <Routes />,
        rootEle
    );
};

render();

if( module.hot ) {
    module.hot.accept('./route', () => {
        render();
    });
}