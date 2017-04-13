import { defaultDispatch, dispatchToAPI } from './common';
import { PACKAGES } from '../reducers/index';
import { deepValue } from '../util/util';

const defaultDispatchPackages = (payload, reducer) =>
  defaultDispatch(PACKAGES, payload, reducer);

/* Action creators */

const packagesRequested = () =>
  defaultDispatchPackages({
    isFetching: true,
    error: null
  });

const packagesReceived = data => {
  const packages = deepValue(data, 'response.data.packages');
  return defaultDispatchPackages({
    isFetching: false,
    packages
  });
};

const packagesError = error =>
  defaultDispatchPackages({
    isFetching: false,
    error
  });

/* Thunks */

// access packages endpoint
export const packagesApi = config => {
  config = {
    method: 'GET',
    ...config,
    url: '/packages'
  };
  return dispatchToAPI({
    config,
    actions: [packagesRequested, packagesReceived, packagesError]
  });
};
