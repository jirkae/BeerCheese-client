import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { paymentOptions } from './PackageOverviewDelPayPage';
import { clearCart } from '../../actions/cart';

class packageOverviewSummaryPage extends Component {
  constructor(props) {
    super(props);
    this.sendOrder = this.sendOrder.bind(this);
  }

  getPaymentType() {
    const { cart } = this.props;
    let name = '';
    paymentOptions.forEach((option) => {
      if (option.value === cart.paymentType) {
        name = option.label;
      }
    });
    return name;
  }

  renderPackages() {
    const { cart } = this.props;
    let i = 1;
    return cart.packages.map((_package) => {
      if (_package.isCreating !== true) {
        return <div key={i}>Balíček {i++}</div>
      }
      return null;
    });
  }

  sendOrder() {
    alert('Objednávka odeslána');
    this.props.clearCart();
    this.context.router.push('/');
  }

  render() {
    const { cart } = this.props;
    return (
      <Row>
        <Col xs={6}>
          <h4>{localizedTexts.PackageOverview.summary.personal}</h4>
          {cart.billingAddress.firstName} {cart.billingAddress.lastName}<br />
          {cart.billingAddress.street}<br />
          {cart.billingAddress.zip}<br />
          {cart.billingAddress.email}<br /><br />
          <h4>{localizedTexts.PackageOverview.summary.delivery}</h4>
          {cart.shipping.name}<br /><br />
          <h4>{localizedTexts.PackageOverview.summary.payment}</h4>
          {this.getPaymentType()}
        </Col>
        <Col xs={6}>
          <h4>{localizedTexts.PackageOverview.summary.packages}</h4>
          {this.renderPackages()}
        </Col>
        <Col xs={12} className="text-center">
          <Button
            onClick={this.sendOrder}>Odeslat objednávku</Button>
        </Col>
      </Row>
    )
  }
};

packageOverviewSummaryPage.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object
}

const mapSateToProps = state => ({
  cart: state.cart,
});

export default connect(mapSateToProps, { clearCart })(packageOverviewSummaryPage);
