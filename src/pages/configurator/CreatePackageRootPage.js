import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PackageCreationNav from '../../components/navigation/PackageCreationNav';
import Preview from '../../components/configurator/preview';
import { connect } from 'react-redux';
import { categoriesApi } from '../../actions/categories';
//import PriceCalculation from '../../components/configurator/PriceCalculation';

class CreatePackageRootPage extends Component {
  componentDidMount() {
    this.props.categoriesApi();
  }

  render() {
    return (
      <div>
        <PackageCreationNav />
        <Row>
          <Col xs="12" className="hidden-sm-up">
            <Preview />
          </Col>
          <Col
            xs={{ size: 12, offset: 0 }}
            sm={{ size: 7, offset: 1}}
          >
            {this.props.children}
          </Col>
          <Col className="hidden-xs-down" xs={{ size: 12}} sm={{ size: 3 }}>
            <Preview />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapSateToProps = state => ({});

export default connect(mapSateToProps, { categoriesApi })(
  CreatePackageRootPage
);
