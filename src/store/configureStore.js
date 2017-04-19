import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers';
import apiMiddleware from '../middleware/api';
import { CART } from '../reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(apiMiddleware, thunk))
  );

  //automatically store cart in localstorage
  store.subscribe(() => {
    const { cart } = store.getState();
    localStorage.setItem(CART, JSON.stringify(cart));
  });

  return store;
};
