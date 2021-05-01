import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

ReactDOM.hydrate(
  <App message={window.__INITIAL_STATE__.message}/>,
  document.querySelector('[data-js="bundle"]')
);
