import { combineReducers } from 'redux';
import { isFunction, isNullOrUndef } from '../util/util';

export const AUTH = 'AUTH';
export const MODAL = 'MODAL';
export const USER = 'USER';
export const PRODUCTS = 'PRODUCTS';
export const PACKAGES = 'PACKAGES';
export const CONFIGURATOR = 'CONFIGURATOR';

const openModalInitialState = {
  name: null,
  data: null
};

const authInitialState = {
  isFetching: false,
  isAuthenticated: !isNullOrUndef(localStorage.getItem('x-auth'))
};

const userInitialState = {
  isFetching: false,
  user: null,
  error: null
};

const packagesInitialState = {
  isFetching: false,
  packages: null,
  error: null
};

const productsInitialState = {
  isFetching: false,
  products: null,
  error: null
};

const configuratorInitialState = {
  products: [],
};

const reducer = (initialState, type) => {
  return (state = initialState, action = {}) => {
    if (action.type === type && isFunction(action.reducer)) {
      return action.reducer(state, action.payload);
    } else {
      return state;
    }
  };
};

export const rootReducer = combineReducers({
  auth: reducer(authInitialState, AUTH),
  openModal: reducer(openModalInitialState, MODAL),
  user: reducer(userInitialState, USER),
  products: reducer(productsInitialState, PRODUCTS),
  packages: reducer(packagesInitialState, PACKAGES),
  configurator: reducer(configuratorInitialState, CONFIGURATOR)
});
