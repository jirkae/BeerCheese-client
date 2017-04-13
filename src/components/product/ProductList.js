import React, { Component } from 'react';
import { Row } from 'reactstrap';
import LazyLoad from "react-lazyload";
import Loading from "../images/Loading";
import Product from "./Product";
import { connect } from 'react-redux';
import { productsApi } from '../../actions/products';
import { isNull } from '../../util/util';

class ProductList extends Component {
  componentWillMount() {
    // get products
    this.props.productsApi();
  }

  renderProducts() {
    const { isFetching, products } = this.props.products;
    if (isFetching) {
      return <Loading />;
    }

    if (!isNull(products) && products.length) {
      return products.map(({ product }) => (
        <LazyLoad placeholder={<Loading />} key={product.id} height="50px">
          <Product product={product} size={this.props.itemSize}/>
        </LazyLoad>
      ));
    }
  }

  render() {
    return (
      <Row>
        {this.renderProducts()}
      </Row>
    );
  }
}

const mapSateToProps = state => ({
  products: state.products
});

export default connect(mapSateToProps, { productsApi })(ProductList);
