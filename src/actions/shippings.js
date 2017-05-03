import { defaultDispatch, dispatchToAPI } from './common';
import { SHIPPINGS } from '../reducers/index';
import { deepValue } from '../util/util';

const defaultDispatchShippings = (payload, reducer) =>
  defaultDispatch(SHIPPINGS, payload, reducer);

/* Action creators */

const shippingsRequested = () =>
  defaultDispatchShippings({
    isFetching: true,
    error: null
  });

const shippingsReceived = ({ response }) => {
  const shippings = deepValue(response, 'data.shippings.items');
  return defaultDispatchShippings({
    isFetching: false,
    shippings
  });
};

const shippingsError = error =>
  defaultDispatchShippings({
    isFetching: false,
    error
  });

/* Thunks */

// access products endpoint
export const shippingsApi = config => {
  config = {
    url: '/shippings',
    method: 'GET',
    ...config
  };
  return dispatchToAPI({
    config,
    actions: [shippingsRequested, shippingsReceived, shippingsError]
  });
};

