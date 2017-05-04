import React from 'react';
import { Link } from 'react-router';
import { Row, Col } from 'reactstrap';
import localizedStrings from '../../text_localization/LocalizedStrings';
import { css } from 'glamor';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

class Cart extends React.Component {
  
  getTotalCountAndPrice() {
    let data = {
      count: 0,
      price: 0
    };
    const {cart} = this.props;
    cart.packages.forEach((_package) => {
      if (_package.isCreating !== true) {
        data.count += 1;
        let packagePrice = 0;
        _package.items.forEach((item) => {
          packagePrice += item.price;
        });
        data.price += packagePrice * _package.count;
      }
    });
    return data;
  }

  render() {
    const totalCountAndPrice = this.getTotalCountAndPrice();

    return (
      <Col xs={2}>

          <Row>
            <Col xs="7">
              <ul className={`${this.cssCartControl}`}>
                <li>
                  {localizedStrings.NavPanel.amount}: {totalCountAndPrice.count} ks
                </li>
                <li>
                  {localizedStrings.NavPanel.price}: {totalCountAndPrice.price.toFixed(2)} Kč
                </li>
              </ul>
            </Col>
            <Col xs="5">
              <Link
                to="/package-overview"
                className={`${this.cssExpandLink}`}
              >
                <FontAwesome name="shopping-cart" style={{fontSize: '45px'}}/>
              </Link>
            </Col>
          </Row>
      </Col>
    );
  }

  cssNavPanel = css({
    margin: 0,
    padding: '5px',
    height: '70px'
  });

  cssCartControl = css({
    listStyleType: 'none',
    minWidth: '140px',
    paddingLeft: '20px',
    paddingTop: '5px'
  });

  cssExpandLink = css({
    textDecoration: 'none',
    color: 'black'
  });
}


const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, {  })(Cart);