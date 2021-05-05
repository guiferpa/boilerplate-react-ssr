import { createStore, Reducer, PreloadedState } from 'redux';

export const configureStore = (reducer: any, state?: any) => {
  return createStore(reducer, state);
}
