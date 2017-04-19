import React from 'react';
import { Card, CardBlock, CardTitle, CardSubtitle, CardLink } from 'reactstrap';
import localizedTexts from '../../text_localization/LocalizedStrings';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';
import { addProduct } from '../../actions/configurator';

const Product = ({ product, openModal, size, configurator, addProduct }) => (
  <Card
    onClick={() => {
      openModal({ name: 'productDetails', data: product });
    }}
    style={{margin: '0 25px 25px 0'}}
  >
    <CardBlock>
      <CardTitle>{product.name}</CardTitle>
    </CardBlock>
    <img
      width={size}
      src="https://placeholdit.imgix.net/~text?txtsize=33&amp;txt=318%C3%97180&amp;w=318&amp;h=180"
      alt="product"
    />
    <CardBlock>
      <CardSubtitle>{product.priceAfterDiscount}</CardSubtitle>
      <CardLink href="#" onClick={(e) => {addProduct(product, configurator.products); e.stopPropagation(); e.preventDefault();}}>{localizedTexts.Product.btnAddToChart}</CardLink>
    </CardBlock>
  </Card>
);

const mapSateToProps = state => ({
  configurator: state.configurator
});


export default connect(mapSateToProps, {
  openModal,
  addProduct
})(Product);
