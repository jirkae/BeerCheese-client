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
                    <Col xs={{ size: 7, offset: 1 }}>
                        {this.props.children}
                    </Col>
                    <Col xs={{ size: 3 }}>
                        <Preview />
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapSateToProps = state => ({
  
});

export default connect(mapSateToProps, { categoriesApi })(CreatePackageRootPage);