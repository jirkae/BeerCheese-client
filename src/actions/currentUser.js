import { defaultDispatch } from './common';
import { USER } from '../reducers/index';
import { CALL_API } from '../middleware/api';

const defaultDispatchUser = (payload, reducer) =>
  defaultDispatch(USER, payload, reducer);

/* Action creators */
const userRequested = () =>
  defaultDispatchUser({
    isFetching: true,
    error: null
  });

const userReceived = ({ response }) => {
  const user = response.data.user;
  return defaultDispatchUser({
    isFetching: false,
    user
  });
};

const userError = error =>
  defaultDispatchUser({
    isFetching: false,
    error
  });

/* Thunks */

export const getCurrentUser = () => {
  const config = {
    url: '/users/current',
    method: 'GET'
  };
  return (dispatch, getState) => {
    const authenticated = getState().auth.isAuthenticated;
    if (authenticated) {
      dispatch({
        [CALL_API]: {
          config,
          actions: [userRequested, userReceived, userError]
        }
      });
    }
  };
};
