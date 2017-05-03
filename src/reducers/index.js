import { combineReducers } from 'redux';
import { isFunction, isNullOrUndef } from '../util/util';

export const AUTH = 'AUTH';
export const MODAL = 'MODAL';
export const USER = 'USER';
export const PRODUCTS = 'PRODUCTS';
export const CATEGORIES = 'CATEGORIES';
export const CART = 'CART';
export const SHIPPINGS = 'SHIPPINGS';

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

/*
 Cart contains:
  - packages (array of packages)
  - shippingAddress
  - shipping
  - status
  - paymentType
  - shipping
  - shippingAddress
  - billingAddress
  - discount
  - price
 */
const cartInitialState = () => {
  const lcCart = localStorage.getItem(CART);
  const defaultCart = { packages: [] };
  try {
    return !isNullOrUndef(lcCart) ? JSON.parse(lcCart) : defaultCart;
  } catch (e) {
    return defaultCart;
  }
};

const productsInitialState = {
  isFetching: false,
  products: null,
  error: null
};

const categoriesInitialState = {
  isFetching: false,
  categories: [],
  error: null
};

const shippingsInitialState = {
  isFetching: false,
  shippings: [],
  error: null
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
  categories: reducer(categoriesInitialState, CATEGORIES),
  shippings: reducer(shippingsInitialState, SHIPPINGS),
  cart: reducer(cartInitialState(), CART)
});
