import React, { Component } from 'react';
import { Card, CardBlock, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/cart';
import { openModal } from '../../actions/openModal';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { PACKAGE_CATEGORY_PATH } from '../../util/util';
import { APP_URL} from '../../api';

class Product extends Component {
  constructor(props) {
    super(props);

    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
  }

  handleAddToCartClick() {
    let newCart = Object.assign({}, this.props.cart);
    let createNewPackage = true;
    newCart.packages.forEach(_package => {
      if (_package.isCreating) {
        createNewPackage = false;
      }
    });
    if (createNewPackage) {
      newCart.packages.push({
        items: [],
        isCreating: true,
        count: 1
      });
    }
    newCart.packages.forEach(_package => {
      let willInsert = true;
      if (_package.isCreating && _package.items.length >= 9 && this.product.category !== PACKAGE_CATEGORY_PATH) {
        willInsert = false;
      }
        if (this.props.product.category === PACKAGE_CATEGORY_PATH) {
          _package.items.forEach((item) => {
            if (item.category === PACKAGE_CATEGORY_PATH) {
              willInsert = false;
            }
          });
        }
      if (willInsert) {
        _package.items.push(this.props.product);
      }
    });
    this.props.updateCart(newCart);
  }

  render() {
    const { product, openModal, size, addCartButton } = this.props;
    return (
      <Card style={{ margin: '0 25px 25px 0' }}>
        <CardBlock
          onClick={() => {
            openModal({ name: 'productDetails', data: product });
          }}
        >
          <CardTitle style={{ width: size + 'px' }}>{product.name}</CardTitle>
        </CardBlock>
        <img
          width={size}
          src={APP_URL + product.image}
          alt="product"
          style={{ alignSelf: 'center' , width: 'auto', maxHeight: '200px'}}
          onClick={() => {
            openModal({ name: 'productDetails', data: product });
          }}
        />
        <CardBlock>
          <CardSubtitle>
            {product.priceAfterDiscount || product.price} Kč
          </CardSubtitle>
          {addCartButton === true && product.quantity > 0 &&
            <Button
              style={{ marginTop: '15px' }}
              onClick={this.handleAddToCartClick}
            >
              {localizedTexts.Product.btnAddToPackage}
            </Button>}
          {product.quantity === 0 &&
          <span>Dočasně vyprodáno</span>}
        </CardBlock>
      </Card>
    );
  }
}

const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, {
  updateCart,
  openModal
})(Product);
