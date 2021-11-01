import {createStore, compose, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from './root.reducers';
import thunk from 'redux-thunk';

const enhancerList = [];
const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

if (typeof devToolsExtension === 'function') {
  enhancerList.push(devToolsExtension());
}

const composedEnhancer = compose(
  applyMiddleware(logger, thunk),
  ...enhancerList,
);

export const initStore = () => createStore(rootReducer, {}, composedEnhancer);

const store = initStore();

export default store;
