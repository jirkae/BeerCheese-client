import React, {Component} from 'react';
import { Card, CardBlock, CardTitle, CardSubtitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { updateCart } from '../../actions/cart';
import { openModal } from '../../actions/openModal';
import localizedTexts from '../../text_localization/LocalizedStrings';

class Product extends Component {
  constructor(props) {
    super(props);

    this.handleAddToCartClick = this.handleAddToCartClick.bind(this);
  }

  handleAddToCartClick() {
    let newCart = Object.assign({}, this.props.cart);
    let createNewPackage = true;
    newCart.packages.forEach((_package) => {
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
    newCart.packages.forEach((_package) => {
      if (_package.isCreating) {
        _package.items.push(this.props.product);
      }
    });
    this.props.updateCart(newCart);
  }

  render() {
    const { product, openModal, size, addCartButton } = this.props;
    return (
      <Card
        style={{ margin: '0 25px 25px 0' }}
      >
        <CardBlock
          onClick={() => {
            openModal({ name: 'productDetails', data: product });
          }}>
          <CardTitle style={{width: size+'px'}}>{product.name}</CardTitle>
        </CardBlock>
        <img
          width={size}
          src="https://placeholdit.imgix.net/~text?txtsize=33&amp;txt=318%C3%97180&amp;w=318&amp;h=180"
          alt="product"
          style={{alignSelf: 'center'}}
          onClick={() => {
            openModal({ name: 'productDetails', data: product });
          }}
        />
        <CardBlock>
          <CardSubtitle>
            {product.priceAfterDiscount || product.price} Kč
          </CardSubtitle>
          {addCartButton === true &&
            <Button style={{marginTop: '15px'}}
              onClick={this.handleAddToCartClick}>{localizedTexts.Product.btnAddToPackage}</Button>
          }
        </CardBlock>
      </Card>
    );
  }
};

const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, {
  updateCart,
  openModal
})(Product);
