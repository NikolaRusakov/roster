/* global __DEVTOOLS__ */
import {createStore, applyMiddleware, compose} from 'redux'
// reducer
import rootReducer from '../reducers'
// middleware
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { createLogger } from 'redux-logger'


import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'

const enforceImmutableMiddleware = reduxImmutableStateInvariant({
    ignore: [

    ]
});

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true,
    predicate: (getState, action) => (action.type !== 'EVENT_SOURCE_RECEIVE')
});

let createStoreWithMiddleware;

/**
 * Konfigurace store včetně middleware.
 */
if (typeof __DEV__ !== 'undefined' && __DEV__) {
    const {persistState} = require('redux-devtools');
    if (__DEVTOOLS__) {
        const DevTools = defaultImport(require('../DevTools'));
        createStoreWithMiddleware = compose(
            applyMiddleware(
                enforceImmutableMiddleware,
                thunkMiddleware,
                promiseMiddleware,
                loggerMiddleware
            ),
            DevTools.instrument(),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore)
    } else {
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        createStoreWithMiddleware = composeEnhancers(
            applyMiddleware(
                enforceImmutableMiddleware,
                thunkMiddleware,
                promiseMiddleware,
                loggerMiddleware
            ),
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(createStore)
    }

} else {
    createStoreWithMiddleware = compose(
        applyMiddleware(thunkMiddleware, promiseMiddleware)
    )(createStore)
}

/**
 * Creates a preconfigured store.
 */
export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = defaultImport(require('../reducers/index'));

            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
