import React from 'react';
import { Card, CardBlock, CardTitle, CardSubtitle } from 'reactstrap';
import { connect } from 'react-redux';
import { openModal } from '../../actions/openModal';

const Product = ({ product, openModal, size }) => (
  <Card
    onClick={() => {
      openModal({ name: 'productDetails', data: product });
    }}
    style={{ margin: '0 25px 25px 0' }}
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
      <CardSubtitle>
        {product.priceAfterDiscount || product.price} Kč
      </CardSubtitle>
    </CardBlock>
  </Card>
);

export default connect(null, {
  openModal
})(Product);
