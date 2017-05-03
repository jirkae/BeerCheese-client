import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { updateCart } from '../../actions/cart';
import { connect } from 'react-redux';
// import ProductList from '../../components/product/ProductList';
// import localizedTexts from '../../text_localization/LocalizedStrings';

class CreatePackageSummaryPage extends Component {
  constructor(props) {
    super(props);
    this.addToCart = this.addToCart.bind(this);
  }

  getPackageText() {
    let text = '';
    const {cart} = this.props;
    cart.packages.forEach((_package) => {
      if (_package.isCreating) {
        text = _package.text;
      }
    })
    return text;
  }

  addToCart() {
    let newCart = Object.assign({}, this.props.cart);
    newCart.packages.forEach((_package) => {
        if (_package.isCreating) {
            _package.isCreating = false;
        }
    });
    this.props.updateCart(newCart);
    this.context.router.push('/package-overview');
  }

  render() {
    return (
      <Row>
        <Col xl={{ size: 10, offset: 2 }} lg="10" md="8" sm="12" xs="12">
          <h1 style={{marginBottom: '30px'}}>Shrnutí</h1>
          <Row>
            <Col xs="2"><strong>Vzkaz:</strong></Col>  
            <Col xs="4">{this.getPackageText()}</Col>  
          </Row>
          <Row>
            <Col xs={{size: 5, offset: 2}} style={{marginTop: '100px'}}> 
              <Button color="secondary" size="lg"
                onClick={this.addToCart}>Vložit do košíku</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

CreatePackageSummaryPage.contextTypes = {
  router: React.PropTypes.object,
  location: React.PropTypes.object
}

const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, { updateCart })(CreatePackageSummaryPage);
