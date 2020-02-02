import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/**
 * @param {object} initialState
 * @returns {func} createStore
 **/

// export default function configureStore(initialState) {
//   return createStore(rootReducer, applyMiddleware(thunk));
// }

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) || compose
  )
);

export default store;
