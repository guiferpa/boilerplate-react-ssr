import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from '../shared/containers/app';
import { configureStore } from '../shared/store';

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}

const state = window.__INITIAL_STATE__;

delete window.__INITIAL_STATE__;

const store = configureStore(() => state, state);

ReactDOM.hydrate(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.querySelector('[data-app="root"]')
);
