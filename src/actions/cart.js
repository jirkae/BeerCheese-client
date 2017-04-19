import { CART } from '../reducers/index';
import { defaultDispatch } from './common';

const cartReducer = (state, payload) => ({
  ...state,
  ...payload,
  //Make sure packages array is changed and not merged together
  packages: payload.packages || state.packages
});

const defaultDispatchCart = (payload, reducer = cartReducer) =>
  defaultDispatch(CART, payload, reducer);

export const updateCart = payload => defaultDispatchCart(payload);
