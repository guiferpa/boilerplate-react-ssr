import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

ReactDOM.hydrate(<App />, document.querySelector('[data-js="bundle"]'));
