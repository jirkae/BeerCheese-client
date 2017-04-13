import { getCurrentUser } from './currentUser';
import { productsApi } from './products';
import { openModal, hideModals } from './openModal';
import { login, logout } from './auth';

/**
 Following is a list of functions which can be connected to react components
 To connect an action to component props, export that component as export connect(`here goes mapStateToProps`, {userApi, login, ...})(componentName)
 All *Api actions receives one parameter config of following format:
 {
  method: 'get' | 'post' | 'put' ....
  
  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  params: {
    ID: 12345
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
  // When no `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream
  data: {
    firstName: 'Fred'
  },
 }
 */

export { getCurrentUser, productsApi, openModal, hideModals, login, logout };
