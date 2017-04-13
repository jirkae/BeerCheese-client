import { defaultDispatch, ommitState } from './common';
import { MODAL } from '../reducers/index';

const defaultDispatchModal = (payload, reducer = ommitState) =>
  defaultDispatch(MODAL, payload, reducer);

export const hideModals = () =>
  defaultDispatchModal({
    name: null,
    data: null
  });

export const openModal = payload => defaultDispatchModal(payload);
