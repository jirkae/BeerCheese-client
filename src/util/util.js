export function isNullOrUndef(obj) {
  return isUndefined(obj) || isNull(obj);
}

export function isFunction(obj) {
  return typeof obj === 'function';
}

export function isNull(obj) {
  return obj === null;
}

export const isArray = Array.isArray;

export function isUndefined(obj) {
  return obj === undefined;
}

export function isString(obj) {
  return typeof obj === 'string';
}

/**
 *
 * @param obj {object}
 * @param path {string} - Path to object property
 * @return {*}
 */
export function deepValue(obj, path) {
  const arrPath = path.split('.');
  for (let i = 0, len = arrPath.length; i < len; i++) {
    if (!isUndefined(obj[arrPath[i]])) {
      obj = obj[arrPath[i]];
    } else return null;
  }
  return obj;
}

export const PACKAGE_CATEGORY_ID = 14;
export const PACKAGE_CATEGORY_PATH = '/api/categories/' + PACKAGE_CATEGORY_ID;

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export const userHasRole = (token, role) => {
  try {
    const jwt = parseJwt(token);
    return jwt['X-Roles'].includes(role);
  } catch (e) {
    return false;
  }
};

export const hasRoleAdmin = token => userHasRole(token, 'admin');
