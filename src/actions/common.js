// To be used as a reducer in action creators
import { CALL_API } from '../middleware/api';
// This will merge current state with changes in payload
export const mergeState = (state, payload) => ({
  ...state,
  ...payload
});

// To be used as a reducer in action creators
// This will replace current state with payload
export const ommitState = (state, payload) => ({ ...payload });

export const defaultDispatch = (type, payload, reducer = mergeState) =>
  dispatch =>
    dispatch({
      type,
      payload,
      reducer: reducer
    });

/**
 * Dispatch api call action
 * @param config <object> axios config object (check ../middleware/api)
 * @param actions <array> array of three action creators which will be called based on api result
 *                        (check ../middleware/api)
 */
export const dispatchToAPI = ({ config, actions }) =>
  dispatch =>
    dispatch({
      [CALL_API]: {
        config,
        actions
      }
    });
