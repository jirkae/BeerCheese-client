import { defaultDispatch, dispatchToAPI } from './common';
import { PRODUCTS } from '../reducers/index';
import { deepValue } from '../util/util';

const defaultDispatchProducts = (payload, reducer) =>
  defaultDispatch(PRODUCTS, payload, reducer);

/* Action creators */

const productsRequested = () =>
  defaultDispatchProducts({
    isFetching: true,
    error: null
  });

const productsReceived = ({ response }) => {
  const products = deepValue(response, 'data.products.items');
  const categories = deepValue(response, 'data.categories.items');
  return defaultDispatchProducts({
    isFetching: false,
    products,
    categories
  });
};

const productsError = error =>
  defaultDispatchProducts({
    isFetching: false,
    error
  });

/* Thunks */

// access products endpoint
export const productsApi = config => {
  config = {
    url: '/products',
    method: 'GET',
    ...config
  };
  return dispatchToAPI({
    config,
    actions: [productsRequested, productsReceived, productsError]
  });
};
