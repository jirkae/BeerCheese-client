import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PackageCreationNav from '../../components/navigation/PackageCreationNav';
import Preview from '../../components/configurator/preview';
import { connect } from 'react-redux';
import { categoriesApi } from '../../actions/categories';
//import PriceCalculation from '../../components/configurator/PriceCalculation';

class EditPackageRootPage extends Component {
  componentDidMount() {
    this.props.categoriesApi();
  }

  getCurrentPackage() {
    const {cart} = this.props;
    return cart.packages[this.props.params.id];
  }

  render() {
    const currentPackage = this.getCurrentPackage();
    return (
      <div>
        <PackageCreationNav  currentPackage={currentPackage}/>
        <Row>
          <Col xs="12" className="hidden-sm-up">
            <Preview />
          </Col>
          <Col
            xs={{ size: 12, offset: 0 }}
            sm={{ size: 7, offset: 1}}
          >
            {React.cloneElement(this.props.children, { currentPackage: currentPackage })}
          </Col>
          <Col className="hidden-xs-down" xs={{ size: 12}} sm={{ size: 3 }}>
            <Preview currentPackage={currentPackage}/>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapSateToProps = state => ({
  cart: state.cart
});

export default connect(mapSateToProps, { categoriesApi })(
  EditPackageRootPage
);
