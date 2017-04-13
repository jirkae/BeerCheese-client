import { defaultDispatch, dispatchToAPI, ommitState } from './common';
import { AUTH } from '../reducers/index';
import { isNullOrUndef } from '../util/util';
import { getCurrentUser } from './currentUser';
import { hideModals } from './openModal';

const defaultDispatchAuth = (payload, reducer = ommitState) =>
  defaultDispatch(AUTH, payload, reducer);

/* Action creators */
const loginRequested = creds =>
  defaultDispatchAuth({
    isFetching: true,
    isAuthenticated: false,
    creds
  });

const loginReceived = () =>
  defaultDispatchAuth({
    isFetching: false,
    isAuthenticated: true
    // authToken
  });

const loginError = err =>
  defaultDispatchAuth({
    isFetching: false,
    isAuthenticated: false,
    err
  });

//Action creator which saves received token
const loginSuccess = data =>
  dispatch => {
    if (
      !isNullOrUndef(data.response) &&
      !isNullOrUndef(data.response.headers) &&
      !isNullOrUndef(data.response.headers['x-auth'])
    ) {
      localStorage.setItem('x-auth', data.response.headers['x-auth']);
      dispatch(loginReceived());
      dispatch(getCurrentUser());
      dispatch(hideModals());
    } else {
      dispatch(loginError('No auth token received'));
    }
  };

const logoutRequested = () => {
  localStorage.removeItem('x-auth');
  return defaultDispatchAuth({
    isFetching: true,
    isAuthenticated: true
  });
};

const logoutSuccess = () => {
  return defaultDispatchAuth({
    isFetching: false,
    isAuthenticated: false
  });
};

/* Thunks */

export const login = (creds = {}) => {
  const config = {
    url: '/auth/login',
    method: 'POST',
    data: {
      login: {
        username: creds.username,
        password: creds.password
      }
    }
  };
  return dispatchToAPI({
    config,
    actions: [loginRequested, loginSuccess, loginError]
  });
};

export const logout = () => {
  const config = {
    url: '/auth/logout',
    method: 'DELETE'
  };
  return dispatchToAPI({
    config,
    actions: [logoutRequested, logoutSuccess, logoutSuccess]
  });
};
