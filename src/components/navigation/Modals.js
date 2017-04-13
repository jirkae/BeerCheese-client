import React from 'react';
import { connect } from 'react-redux';
import { hideModals } from '../../actions/openModal';
import ProductDetails from '../popup/ProductDetails';
import NewProductAdmin from '../popup/NewProductAdmin';
import EditProductAdmin from '../popup/EditProductAdmin';
import EditCustomerAdmin from '../popup/EditCustomerAdmin';
import NewSupplierAdmin from '../popup/NewSupplierAdmin';
import EditSupplierAdmin from '../popup/EditSupplierAdmin';
import EditOrderAdmin from '../popup/EditOrderAdmin';
import LogIn from '../popup/LogIn';

const Modals = (props) => {
  return(
    <div>
      {props.openModal.name === 'productDetails' ? <ProductDetails data={props.openModal.data} hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'newProductAdmin' ? <NewProductAdmin hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editProductAdmin' ? <EditProductAdmin data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editCustomerAdmin' ? <EditCustomerAdmin data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'newSupplierAdmin' ? <NewSupplierAdmin hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editSupplierAdmin' ? <EditSupplierAdmin data={props.openModal.data} hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'editOrderAdmin' ? <EditOrderAdmin data={props.openModal.data}  hideModals={props.hideModals}/> : ''}
      {props.openModal.name === 'logIn' ? <LogIn hideModals={props.hideModals}/> : ''}
    </div>
  );
};

export default connect(
  (state) => ({
    openModal: state.openModal
  }),
  {
    hideModals
  }
)(Modals);
