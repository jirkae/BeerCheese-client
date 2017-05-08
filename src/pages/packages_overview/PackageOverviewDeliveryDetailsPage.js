import React, { Component } from 'react';
import { Form, FormGroup, Label, Col, Input } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { isString } from '../../util/util';
import { updateCart } from '../../actions/cart';
import { connect } from 'react-redux';

export const addressFields = {
  firstName: localizedTexts.PackageOverview.deliveryDetails.firstName,
  lastName: localizedTexts.PackageOverview.deliveryDetails.lastName,
  email: localizedTexts.PackageOverview.deliveryDetails.email,
  phone: localizedTexts.PackageOverview.deliveryDetails.phone,
  street: localizedTexts.PackageOverview.deliveryDetails.street,
  city: localizedTexts.PackageOverview.deliveryDetails.city,
  zip: localizedTexts.PackageOverview.deliveryDetails.zip,
}

class PackageOverviewDeliveryDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      billingAddress: {},
      shippingAddress: {}
    };
    this.onShippingAddressChange = this.onShippingAddressChange.bind(this);
    this.onBillingAddressChange = this.onBillingAddressChange.bind(this);
  }

  renderInput(name, label, value, onChangeEvent) {
    return (
      <FormGroup key={name} row>
        <Label for={name} sm={2}>{label}</Label>
        <Col xs={5}>
          <Input type="text" name={name} id={name} 
          value={value}
          onChange={(e) => {onChangeEvent(name, e.target.value)}}/>
        </Col>
      </FormGroup>
    );
  }

  onShippingAddressChange(key, value) {
    let newCart = Object.assign({}, this.props.cart);
    if (typeof newCart.shippingAddress === 'undefined') {
      newCart.shippingAddress = {};
    }
    newCart.shippingAddress[key] = value;
    this.props.updateCart(newCart);
  }

  onBillingAddressChange(key, value) {
    let newCart = Object.assign({}, this.props.cart);
    if (typeof newCart.billingAddress === 'undefined') {
      newCart.billingAddress = {};
    }
    newCart.billingAddress[key] = value;
    this.props.updateCart(newCart);
  }

  onOthersChange(key, value) {
    let newCart = Object.assign({}, this.props.cart);
    newCart[key] = value;
    this.props.updateCart(newCart);
  }

  renderBillingAddress() {
    let inputs = [];
    const { billingAddress } = this.props.cart;
    for (let key in addressFields) {
      inputs.push(this.renderInput(key, addressFields[key], typeof billingAddress !== 'undefined' && isString(billingAddress[key]) ? billingAddress[key] : '', this.onBillingAddressChange));
    }
    return inputs;
  }

  renderShippingAddress() {
    let inputs = [];
    const { shippingAddress } = this.props.cart;
    for (let key in addressFields) {
      inputs.push(this.renderInput(key, addressFields[key], typeof shippingAddress !== 'undefined' && isString(shippingAddress[key]) ? shippingAddress[key] : '', this.onShippingAddressChange));
    }
    return inputs;
  }

  render() {
    const {cart} = this.props;
    return (
      <Form>
        <h4>{localizedTexts.PackageOverview.deliveryDetails.contacts}</h4>
        {this.renderBillingAddress()}
        {cart.differentShipping &&
          <div>
            <h4>Dodací údaje</h4>
            {this.renderShippingAddress()}
          </div>}
        <FormGroup check>
          <Label check>
            <Input type="checkbox" id="register" 
            name="register"
            onChange={(e) => {this.onOthersChange('register', e.target.checked)}}
            checked={typeof cart.register !== 'undefined' ? cart.register : false }/>{' '}
            {localizedTexts.PackageOverview.deliveryDetails.register}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" id="differentShipping" 
            name="differentShipping"
            onChange={(e) => {this.onOthersChange('differentShipping', e.target.checked)}}
            checked={typeof cart.differentShipping !== 'undefined' ? cart.differentShipping : false }/>{' '}
            {localizedTexts.PackageOverview.deliveryDetails.differentDeliveryContact}
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="checkbox" id="agree"
            name="agree"
            onChange={(e) => {this.onOthersChange('agree', e.target.checked)}}
            checked={typeof cart.agree !== 'undefined' ? cart.agree : false } />{' '}
            {localizedTexts.PackageOverview.deliveryDetails.agree}
          </Label>
        </FormGroup>
      </Form>
    );
  }
}


const mapSateToProps = state => ({
  cart: state.cart,
});

export default connect(mapSateToProps, { updateCart })(PackageOverviewDeliveryDetailsPage);