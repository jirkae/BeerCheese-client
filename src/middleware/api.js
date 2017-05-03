/*
* Customized API middleware from
* https://github.com/reactjs/redux/blob/master/examples/real-world/src/middleware/api.js
*
* For more details check this https://auth0.com/blog/secure-your-react-and-redux-app-with-jwt-authentication/
* The only difference here is that 'CALL_API' instead of types array contains actions array of
* actions creators which are then directly dispatched based on callApi result
*
* To trigger thi middleware, make the dispatched action object to contain only CALL_API property
* (action[CALL_API]) with following content:
* {
*   endpoint : string //target api url
*   authenticated : boolean //whether or not to include authentication token to request header
*   config : object //axios request config
*   actions : array //array of three actions to be called based on api request state:
*                          1. action is called to notify about begining of request
*                          2. action is called on success\
*                          3. action is called on error
*                          Check bottom of this file
* }
*
* */

import {
  isArray,
  isFunction,
  isNullOrUndef,
  isString,
  isUndefined
} from '../util/util';
import api from '../api';
import { tokenTimeout } from '../actions/auth';
import { dispatchToAPI } from '../actions/common';

function callApi(config = {}) {
  const request = api(config);
  request.catch(err => console.log(err));
  return request;
}

export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API];

  // So the middleware doesn't get applied to every single action
  if (isUndefined(callAPI)) {
    return next(action);
  }

  const { actions, config } = callAPI;

  if (isNullOrUndef(config) || !isString(config.url)) {
    throw new Error('Specify a string url in config.');
  }

  if (!isArray(actions) || actions.length !== 3) {
    throw new Error('Expected an array of three actions.');
  }
  if (!actions.every(isFunction)) {
    throw new Error('Expected actions to be functions');
  }

  const [requestAction, successAction, errorAction] = actions;

  next(requestAction());

  return callApi(config)
    .then(response => {
      next(successAction({ response }));
    })
    .catch(error => {
      if (error.response.status === 401) {
        next(tokenTimeout());
        //Send previous request again
        next(dispatchToAPI(callAPI));
      }
      next(errorAction({ error }));
    });
};
