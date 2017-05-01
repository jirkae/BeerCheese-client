import { defaultDispatch, dispatchToAPI } from './common';
import { CATEGORIES } from '../reducers/index';
import { deepValue } from '../util/util';

const defaultDispatchCategories = (payload, reducer) =>
  defaultDispatch(CATEGORIES, payload, reducer);

/* Action creators */

const categoriesRequested = () =>
  defaultDispatchCategories({
    isFetching: true,
    error: null
  });

const categoriesReceived = ({ response }) => {
  const categories = deepValue(response, 'data.categories.items');
  return defaultDispatchCategories({
    isFetching: false,
    categories
  });
};

const categoriesError = error =>
  defaultDispatchCategories({
    isFetching: false,
    error
  });

/* Thunks */

// access products endpoint
export const categoriesApi = config => {
  config = {
    url: '/categories',
    method: 'GET',
    ...config
  };
  return dispatchToAPI({
    config,
    actions: [categoriesRequested, categoriesReceived, categoriesError]
  });
};

